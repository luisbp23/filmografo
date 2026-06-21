import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);

  query = '';

  /** Controla a visibilidade do menu "+" (Adicionar filme/série). */
  isAddMenuOpen = false;

  /** Controla a visibilidade do menu de opções do utilizador. */
  isUserMenuOpen = false;

  /**
   * Navega para a página de resultados de pesquisa. Por agora apenas troca
   * de rota — a ligação à API (passar o termo de pesquisa, obter
   * resultados reais) é feita numa fase seguinte.
   */
  search(): void {
    if (this.query.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: this.query } });
      this.closeMenus();
    }
  }

  /** Clicar no logótipo leva sempre à página principal, a partir de qualquer ecrã. */
  goHome(): void {
    this.closeMenus();
    this.router.navigate(['/']);
  }

  toggleAddMenu(): void {
    this.isUserMenuOpen = false;
    this.isAddMenuOpen = !this.isAddMenuOpen;
  }

  toggleUserMenu(): void {
    this.isAddMenuOpen = false;
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeMenus(): void {
    this.isAddMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  /** Fecha os menus abertos quando se clica fora da navbar. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenus();
    }
  }
}