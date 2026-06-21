import { Component } from '@angular/core';
import { CatalogPlaceholder } from '../../components/catalog-placeholder/catalog-placeholder';

@Component({
  selector: 'app-filmes',
  imports: [CatalogPlaceholder],
  template: `<app-catalog-placeholder icon="🎬" label="Filmes"></app-catalog-placeholder>`,
  templateUrl: './filmes.html',
  styleUrl: './filmes.css',
})
export class Filmes {}
