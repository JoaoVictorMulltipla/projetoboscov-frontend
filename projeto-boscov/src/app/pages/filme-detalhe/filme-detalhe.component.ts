import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
  FilmeService,
  FilmeDetalhe,
  Avaliacao
} from '../../services/filme.service';
import { AvaliacoesService } from '../../services/avaliacao.service';
import { AuthService } from '../../services/auth.service';
import { FormAvaliacaoComponent } from '../../components/form-avaliacao/form-avaliacao.component';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrls: ['./filme-detalhe.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
  ]
})
export class FilmeDetalheComponent implements OnInit {
  filme?: FilmeDetalhe;
  displayedColumns: string[] = ['usuario', 'nota', 'comentario', 'acoes'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmeService: FilmeService,
    private avaliacoesService: AvaliacoesService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/filmes']);
      return;
    }
    this.carregarFilme(id);
  }


  private carregarFilme(id: number) {
    this.filmeService.buscarFilmePorId(id).subscribe(f => (this.filme = f));
  }


  get media(): number {
    if (!this.filme?.avaliacoes?.length) return 0;
    const soma = this.filme.avaliacoes.reduce((t, a) => t + a.nota, 0);
    return +(soma / this.filme.avaliacoes.length).toFixed(1);
  }


  minhaAvaliacao(): Avaliacao | undefined {
    const user = this.auth.getUser();          // adapte para seu método real
    return this.filme?.avaliacoes.find(a => a.usuario.id === user?.id);
  }


  avaliar(): void {
    const user = this.auth.getUser();
    if (!user || !this.filme) return;

    const existente = this.minhaAvaliacao();

    const ref = this.dialog.open(FormAvaliacaoComponent, {
      width: '400px',
      data: {
        nota: existente?.nota ?? 5,
        comentario: existente?.comentario ?? ''
      }
    });

    ref.afterClosed().subscribe(res => {
      if (!res) return;
      const acao$ = existente
        ? this.avaliacoesService.atualizar(
            user.id,
            this.filme!.id,
            res
          )
        : this.avaliacoesService.criar({
            idUsuario: user.id,
            idFilme: this.filme!.id,
            ...res
          });
      acao$.subscribe(() => this.carregarFilme(this.filme!.id));
    });
  }


  excluir(idUsuario: number) {
    if (!this.filme) return;
    this.avaliacoesService
      .deletar(idUsuario, this.filme.id)
      .subscribe(() => this.carregarFilme(this.filme!.id));
  }


  podeExcluir(a: Avaliacao): boolean {
    const user = this.auth.getUser();
    return (
      user?.id === a.usuario.id || user?.tipoUsuario === 'ADMIN'
    );
  }
}
