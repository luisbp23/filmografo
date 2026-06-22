import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DropdownMenu, MenuOption } from '../dropdown-menu/dropdown-menu';
import { AuthService } from '../../services/auth';
import { LanguageService, Lang } from '../../services/language';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, FormsModule, DropdownMenu, TranslatePipe],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  private router = inject(Router);
  private auth = inject(AuthService);
  lang = inject(LanguageService);
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

  adicionarConteudo() {
    this.router.navigate(['/add-content']);
  }

  setLang(language: Lang): void {
    this.lang.setLang(language);
  }

  accountOptions: MenuOption[] = [
    { label: this.lang.t('auth.settings'), action: () => console.log('definicoes') },
    { label: this.lang.t('auth.logout'), action: () => this.terminarSessao() },
  ];

  terminarSessao() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}