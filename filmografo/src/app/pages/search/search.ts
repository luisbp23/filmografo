import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Tmdb } from '../../tmdb';

export type SearchResultType = 'movie' | 'tv' | 'person';

export interface SearchResult {
  id: number;
  type: SearchResultType;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
}

export type SearchFilter = 'all' | SearchResultType;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);

  query = '';
  activeFilter: SearchFilter = 'all';
  selectedYear = '';
  results: SearchResult[] = [];
  isLoading = false;

  ngOnInit(): void {
    // Escutamos os queryParams. Sempre que o URL mudar, fazemos nova pesquisa.
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.performSearch(this.query);
      } else {
        this.results = [];
      }
    });
  }

  performSearch(query: string): void {
    this.isLoading = true;
    this.tmdb.search(query).subscribe({
      next: (response: any) => {
        // Mapeamos a resposta complexa da API (multi-search) para a nossa interface
        this.results = response.results.map((item: any) => ({
          id: item.id,
          type: item.media_type as SearchResultType,
          title: item.title || item.name, 
          overview: item.overview || 'Sem sinopse disponível.',
          poster_path: item.poster_path || item.profile_path, 
          release_date: item.release_date || item.first_air_date
        })).filter((item: SearchResult) => ['movie', 'tv', 'person'].includes(item.type));
        
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro na pesquisa:', err);
        this.isLoading = false;
      }
    });
  }

  setFilter(filter: SearchFilter): void {
    this.activeFilter = filter;
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = selectElement.value;
  }

  get filteredResults(): SearchResult[] {
    let filtered = this.results;

    // 1. Aplica o filtro de Tipo (Filmes, Séries, Pessoas)
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter((result) => result.type === this.activeFilter);
    }

    // 2. Aplica o filtro de Ano (se houver algum ano selecionado)
    if (this.selectedYear) {
      filtered = filtered.filter((result) => {
        if (!result.release_date) {
          return false;
        }
        return result.release_date.startsWith(this.selectedYear);
      });
    }

    return filtered;
  }

  typeLabel(type: SearchResultType): string {
    switch (type) {
      case 'movie': return 'Filme';
      case 'tv': return 'Série';
      case 'person': return 'Pessoa';
      default: return 'Desconhecido';
    }
  }
}