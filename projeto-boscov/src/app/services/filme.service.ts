import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Filme {
  id: number;
  nome: string;
  diretor: string;
  anoLancamento: number;
  genero?: { descricao: string };
  duracao: number;
  produtora: string;
  classificacao: string;
  poster: string;
}

@Injectable({ providedIn: 'root' })
export class FilmeService {
  private readonly apiUrl = 'http://localhost:3000/filmes';

  constructor(private http: HttpClient) {}

  listarFilmes(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);
  }
}
