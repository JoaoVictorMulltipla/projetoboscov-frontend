import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: string;
    apelido?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  /* ---------- Login ---------- */
  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap((res) => {
          this.storage.set('token', res.token);
          this.storage.set('usuario', res.usuario);
        })
      );
  }

  /* ---------- Logout ---------- */
  logout(): void {
    this.storage.remove('token');
    this.storage.remove('usuario');
  }

  /* ---------- Helper ---------- */
  isAuthenticated(): boolean {
    return !!this.storage.get('token');
  }

  getUser(): any {
    return this.storage.get('usuario');
  }

  /* ---------- Atualizar perfil ---------- */
  atualizarUsuario(id: number, dados: any) {
    return this.http.patch(`${this.apiUrl}/usuarios/${id}`, dados).pipe(
      tap(() => {
        const user = this.getUser();
        if (user) {
          const atualizado = { ...user, ...dados };
          this.storage.set('usuario', atualizado);
        }
      })
    );
  }

  registrarUsuario(dados: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/usuarios`, dados);
  }

}
