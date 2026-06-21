import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DropdownMenu, MenuOption } from '../dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, DropdownMenu],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
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