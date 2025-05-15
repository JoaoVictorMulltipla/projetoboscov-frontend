import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvaliacoesService {
  private apiUrl = `http://localhost:3000/avaliacoes`;

  constructor(private http: HttpClient) {}

  criar(avaliacao: { idUsuario: number, idFilme: number, nota: number, comentario: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, avaliacao);
  }

  atualizar(idUsuario: number, idFilme: number, dados: { nota: number, comentario: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idUsuario}/${idFilme}`, dados);
  }

  deletar(idUsuario: number, idFilme: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUsuario}/${idFilme}`);
  }
}
