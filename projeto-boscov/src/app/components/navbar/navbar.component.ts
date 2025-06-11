import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink
  ],
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get apelido(): string {
    return this.auth.getUser()?.apelido ?? '';
  }

  editarPerfil() {
    this.router.navigate(['/perfil']);
  }

  gerenciarUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  isAdmin(): boolean {
  const usuario = this.auth.getUser();
  return usuario?.tipoUsuario === 'ADMIN';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
