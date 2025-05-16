import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-layout-logado',
  templateUrl: './layout-logado.component.html',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  styleUrls: ['./layout-logado.component.css']
})
export class LayoutLogadoComponent {}
