import { Component, inject, HostListener, ElementRef } from '@angular/core';
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
  private elementRef = inject(ElementRef<HTMLElement>);

  query = '';

  search(): void {
    if (this.query.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: this.query } });
    }
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