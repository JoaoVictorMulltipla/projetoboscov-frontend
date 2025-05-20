import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EditarUsuarioComponent {
  nome = '';
  apelido = '';
  senha = '';
  confirmarSenha = '';
  hide = true;
  hideConfirm = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.nome = data.nome;
    this.apelido = data.apelido;
  }

  senhasIguais(): boolean {
    return this.senha === this.confirmarSenha;
  }

  salvar() {
    if (!this.senhasIguais()) {
      this.snackBar.open('As senhas não coincidem!', 'Fechar', { duration: 3000 });
      return;
    }

    const dadosAtualizados: any = {
      nome: this.nome,
      apelido: this.apelido
    };

    if (this.senha) dadosAtualizados.senha = this.senha;

    this.usuarioService.atualizarUsuario(this.data.id, dadosAtualizados).subscribe({
      next: () => {
        this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar o usuário.', 'Fechar', { duration: 3000 });
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
