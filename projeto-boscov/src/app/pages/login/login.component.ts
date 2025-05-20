import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistroComponent } from '../../components/registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  abrirRegistro() {
    const dialogRef = this.dialog.open(RegistroComponent);

    dialogRef.afterClosed().subscribe((registrado) => {
      if (registrado) {
        this.router.navigate(['/filmes']);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      this.authService.login(email, senha).subscribe({
        next: (res) => {
          const usuario = res.usuario;

          if (!usuario.status) {
            this.snackBar.open(
              'Este usuário está desativado. Contate um administrador.',
              'Fechar',
              {
                duration: 4000,
                panelClass: ['error-snackbar'],
              }
            );
            return;
          }

          console.log('Token recebido:', res.token);

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(usuario));
          }

          this.router.navigate(['/filmes']);

          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (err) => {
          console.error('Erro ao logar:', err);
          this.snackBar.open('Email ou senha inválidos.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
