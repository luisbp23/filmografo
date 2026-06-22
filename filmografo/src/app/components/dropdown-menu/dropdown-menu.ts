import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export interface MenuOption {
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-dropdown-menu',
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css',
})
export class DropdownMenu {
  @Input() options: MenuOption[] = [];
  @Input() trigger: any;
}
