import { Component } from '@angular/core';
import { CatalogPlaceholder } from '../../components/catalog-placeholder/catalog-placeholder';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CatalogPlaceholder],
  template: `<app-catalog-placeholder icon="👤" label="Pessoas"></app-catalog-placeholder>`
})
export class Pessoas {}