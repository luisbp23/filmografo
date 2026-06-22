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
  isAdmin = false;
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);
  private auth = inject(AuthService);
  query = '';
  
  accountOptions: MenuOption[] = [];
  
  ngOnInit() {
    this.auth.onAuthChange(async session => {
      this.isLoggedIn = !!session;
      if (session) {
        const role = await this.auth.getUserRole();
        console.log('role:', role);  // ← adiciona isto
        this.isAdmin = role === 'admin';
        this.buildMenu();
      } else {
        this.accountOptions = [];
      }
    });
  }
  
  buildMenu() {
    setTimeout(() => {
      this.accountOptions = [
        ...(this.isAdmin ? [{ label: 'Painel Admin', action: () => this.router.navigate(['/admin']) }] : []),
        { label: 'Terminar sessão', action: () => this.terminarSessao() },
      ];
    });
  }
  
  search(): void {
    if (this.query.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: this.query } });
    }
  }
  
  clearSearch(): void {
    this.query = '';
  }
  
  terminarSessao() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}