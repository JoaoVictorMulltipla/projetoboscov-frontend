import { Component, OnInit } from '@angular/core';
import { Filme, FilmeService } from '../../services/filme.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../paginator-pt';

@Component({
  selector: 'app-filmes',
  standalone: true,
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ]
})
export class FilmeComponent implements OnInit {
  filmes: Filme[] = [];
  filmesFiltrados: Filme[] = [];
  termoBusca: string = '';

  paginaAtual: number = 0;
  filmesPorPagina: number = 5;

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService.listarFilmes().subscribe((filmes) => {
      this.filmes = filmes;
      this.filmesFiltrados = filmes;
    });
  }

  filtrarFilmes(): void {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      this.filmesFiltrados = this.filmes;
      return;
    }

    this.filmesFiltrados = this.filmes.filter(
      (f) =>
        f.nome?.toLowerCase().includes(termo) ||
        f.diretor?.toLowerCase().includes(termo) ||
        f.genero?.descricao?.toLowerCase().includes(termo)
    );
    this.paginaAtual = 0;
  }

  onPageChange(event: PageEvent): void {
    this.paginaAtual = event.pageIndex;
    this.filmesPorPagina = event.pageSize;
  }

  get filmesPaginados(): Filme[] {
    const start = this.paginaAtual * this.filmesPorPagina;
    return this.filmesFiltrados.slice(start, start + this.filmesPorPagina);
  }
}
