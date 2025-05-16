import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-form-avaliacao',
  templateUrl: './form-avaliacao.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  styleUrls: ['./form-avaliacao.component.css']
})
export class FormAvaliacaoComponent {
  nota: number;
  comentario: string;
  estrelas: number[] = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<FormAvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nota: number, comentario: string }
  ) {
    this.nota = data.nota;
    this.comentario = data.comentario;
  }

  setNota(valor: number) {
    this.nota = valor;
  }

  salvar() {
    this.dialogRef.close({ nota: this.nota, comentario: this.comentario });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
