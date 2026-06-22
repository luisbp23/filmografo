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
  private router = inject(Router);
  private auth = inject(AuthService);
  lang = inject(LanguageService);
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