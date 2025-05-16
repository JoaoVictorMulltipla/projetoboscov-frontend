import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink
  ],
})
export class PerfilComponent {
  nome: string = '';
  apelido: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  hide: boolean = true;
  hideConfirm: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const user = this.auth.getUser();
    if (user) {
      this.nome = user.nome;
      this.apelido = user.apelido;
    }
  }

  senhasIguais(): boolean {
    return this.senha === this.confirmarSenha;
  }

  salvar() {
    const user = this.auth.getUser();
    if (!user) return;

    if (!this.senhasIguais()) {
      this.snackBar.open('As senhas não coincidem!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'], // você pode criar um estilo para erros
      });
      return;
    }

    const dadosAtualizados: any = {
      nome: this.nome,
      apelido: this.apelido,
    };

    if (this.senha) dadosAtualizados.senha = this.senha;

    this.auth.atualizarUsuario(user.id, dadosAtualizados).subscribe(() => {
      this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.router.navigate(['/filmes']);
    });
  }
}
