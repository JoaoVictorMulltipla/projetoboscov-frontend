import { Routes } from '@angular/router';
import { LayoutLogadoComponent } from './components/layout-logado/layout-logado.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: LayoutLogadoComponent,
    canActivate: [authGuard],
    children: [
      { path: 'filmes', loadComponent: () => import('./pages/filme/filme.component').then(m => m.FilmeComponent) },
      { path: 'filmes/:id', loadComponent: () => import('./pages/filme-detalhe/filme-detalhe.component').then(m => m.FilmeDetalheComponent) },
      { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) },
      { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent) }
    ]
  },

  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) }
];
