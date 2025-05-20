import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  atualizarUsuario(id: number, dados: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, dados);
  }

  desativarUsuario(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { status: false });
  }
}
