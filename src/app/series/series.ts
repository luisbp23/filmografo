import { Component } from '@angular/core';
import { CatalogPlaceholder } from '../catalog-placeholder/catalog-placeholder';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CatalogPlaceholder],
  template: `<app-catalog-placeholder icon="📺" label="Séries"></app-catalog-placeholder>`
})
export class Series {}