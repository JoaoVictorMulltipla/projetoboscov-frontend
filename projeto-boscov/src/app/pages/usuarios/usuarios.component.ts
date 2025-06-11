import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistroComponent } from '../../components/registro/registro.component';
import { EditarUsuarioComponent } from '../../components/editar-usuario/editar-usuario.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, registerLocaleData } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
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
  selector: 'app-usuarios',
  imports: [
    MatTableModule,
    MatIconModule,
    NgClass,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  colunas = ['nome', 'email', 'tipoUsuario', 'acoes'];
  usuarios = new MatTableDataSource<any>();

  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (dados) =>
        (this.usuarios.data = dados.filter((u) => u.status !== false)),
      error: () =>
        this.snackBar.open('Erro ao carregar usuários.', 'Fechar', {
          duration: 3000,
        }),
    });
  }

  abrirCadastro(): void {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.carregarUsuarios();
      }
    });
  }

  editar(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '400px',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.carregarUsuarios();
      }
    });
  }

  desativarUsuario(usuario: any): void {
    if (confirm('Deseja realmente desativar este usuário?')) {
      this.usuarioService
        .atualizarUsuario(usuario.id, { status: false })
        .subscribe({
          next: () => {
            this.snackBar.open('Usuário deletado.', 'Fechar', {
              duration: 3000,
            });
            this.carregarUsuarios();
          },
          error: () =>
            this.snackBar.open('Erro ao deletar usuário.', 'Fechar', {
              duration: 3000,
            }),
        });
    }
  }
}
