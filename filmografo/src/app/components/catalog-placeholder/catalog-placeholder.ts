import { Component, Input } from '@angular/core';

/**
 * Placeholder genérico para páginas de catálogo (Filmes, Séries, Pessoas)
 * que ainda não têm o seu desenho final. Mostra apenas um título e uma
 * mensagem, mantendo a navbar/sidebar visíveis à volta.
 */
@Component({
  selector: 'app-catalog-placeholder',
  standalone: true,
  templateUrl: './catalog-placeholder.html',
  styleUrl: './catalog-placeholder.css'
})
export class CatalogPlaceholder {
  @Input() icon = '🎬';
  @Input() label = 'Catálogo';
}