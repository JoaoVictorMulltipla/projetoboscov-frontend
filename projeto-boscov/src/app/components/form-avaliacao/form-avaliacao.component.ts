import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatButtonModule, MatDialogModule],
  selector: 'app-form-avaliacao',
  templateUrl: './form-avaliacao.component.html'
})
export class FormAvaliacaoComponent {
  nota: number;
  comentario: string;

  constructor(
    public dialogRef: MatDialogRef<FormAvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nota: number, comentario: string }
  ) {
    this.nota = data.nota;
    this.comentario = data.comentario;
  }

  salvar() {
    this.dialogRef.close({ nota: this.nota, comentario: this.comentario });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
