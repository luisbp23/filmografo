import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DropdownMenu, MenuOption } from '../dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, FormsModule, DropdownMenu],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {

  private router = inject(Router);

  query = '';

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
  };

  terminarSessao() {
    console.log('terminar sessao');
  }
}