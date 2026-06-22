import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  imports: [DatePipe, RouterLink],
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

    if (this.activeFilter !== 'all') {
      filtered = filtered.filter((result) => result.type === this.activeFilter);
    }

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

  getDetailsRoute(result: SearchResult): any[] {
    switch (result.type) {
      case 'movie': return ['/filmes', result.id];
      case 'tv': return ['/series', result.id];
      case 'person': return ['/pessoas', result.id];
      default: return [];
    }
  }
}