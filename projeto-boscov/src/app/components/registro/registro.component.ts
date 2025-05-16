import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class RegistroComponent {
  nome = '';
  email = '';
  senha = '';
  data_nascimento = '';
  apelido = '';

  constructor(
    private dialogRef: MatDialogRef<RegistroComponent>,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  registrar() {
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      data_nascimento: this.data_nascimento,
      apelido: this.apelido,
      tipoUsuario: "CLIENTE"
    };

    this.auth.registrarUsuario(dados).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Erro ao cadastrar. Verifique os dados.', 'Fechar', { duration: 3000 });
      },
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
