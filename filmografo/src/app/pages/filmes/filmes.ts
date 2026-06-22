import { Component } from '@angular/core';
import { CatalogPlaceholder } from '../../components/catalog-placeholder/catalog-placeholder';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CatalogPlaceholder],
  template: `<app-catalog-placeholder icon="🎬" label="Filmes"></app-catalog-placeholder>`
})
export class Filmes {}