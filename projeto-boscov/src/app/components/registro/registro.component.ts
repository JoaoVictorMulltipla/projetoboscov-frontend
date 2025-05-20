import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: '../registro/registro.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
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
      tipoUsuario: 'CLIENTE',
    };

    this.auth.registrarUsuario(dados).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Erro ao cadastrar. Verifique os dados.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
