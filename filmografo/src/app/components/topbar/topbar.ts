import { Component, inject, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DropdownMenu, MenuOption } from '../dropdown-menu/dropdown-menu';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, FormsModule, DropdownMenu],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar implements OnInit {
  isLoggedIn = false;
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);
  private auth = inject(AuthService);
  query = '';

  ngOnInit() {
    this.auth.onAuthChange(session => {
      this.isLoggedIn = !!session;
    });
  }

  search(): void {
    if (this.query.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: this.query } });
    }
  }

  // Função que apaga o texto da barra de pesquisa
  clearSearch(): void {
    this.query = '';
  }

  accountOptions: MenuOption[] = [
    { label: 'Definições', action: () => this.definicoes() },
    { label: 'Terminar sessão', action: () => this.terminarSessao() },
  ]

  definicoes() {
    console.log('definicoes');
  }

  terminarSessao() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}