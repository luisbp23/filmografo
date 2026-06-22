import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';
import { AuthService } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

export type SearchResultType = 'movie' | 'tv' | 'person';
export type SearchResultSource = 'tmdb' | 'local';

export interface SearchResult {
  id: number;
  type: SearchResultType;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  source: SearchResultSource;
  imageurl?: string;
}

export type SearchFilter = 'all' | SearchResultType;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);
  private auth = inject(AuthService);

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

  async performSearch(query: string): Promise<void> {
    this.isLoading = true;
    this.results = [];

    // Pesquisa no TMDB
    const tmdbResults = await new Promise<SearchResult[]>((resolve) => {
      this.tmdb.search(query).subscribe({
        next: (response: any) => {
          const results = response.results.map((item: any) => ({
            id: item.id,
            type: item.media_type as SearchResultType,
            title: item.title || item.name,
            overview: item.overview || 'Sem sinopse disponível.',
            poster_path: item.poster_path || item.profile_path,
            release_date: item.release_date || item.first_air_date,
            source: 'tmdb' as SearchResultSource
          })).filter((item: SearchResult) => ['movie', 'tv', 'person'].includes(item.type));
          resolve(results);
        },
        error: () => resolve([])
      });
    });

    // Pesquisa no Supabase
    const { data: localData } = await this.auth.supabaseClient
      .from('content')
      .select('*')
      .ilike('title', `%${query}%`);

    const localResults: SearchResult[] = (localData || []).map((item: any) => ({
      id: item.id,
      type: (item.type === 'series' ? 'tv' : 'movie') as SearchResultType,
      title: item.title,
      overview: item.synopsis || 'Sem sinopse disponível.',
      poster_path: null,
      imageurl: item.imageurl,
      release_date: item.created_at,
      source: 'local' as SearchResultSource
    }));

    this.results = [...tmdbResults, ...localResults];
    this.isLoading = false;
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
        if (!result.release_date) return false;
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

  getPosterUrl(result: SearchResult): string {
    if (result.source === 'local') {
      return result.imageurl || 'https://placehold.co/120x180?text=Sem+imagem';
    }
    return result.poster_path
      ? 'https://image.tmdb.org/t/p/w185' + result.poster_path
      : 'https://placehold.co/120x180?text=Sem+imagem';
  }

  getDetailsRoute(result: SearchResult): any[] | null {
    if (result.source === 'local') return ['/conteudo', result.id];
      switch (result.type) {
        case 'movie': return ['/filmes', result.id];
        case 'tv': return ['/series', result.id];
        case 'person': return ['/pessoas', result.id];
        default: return null;
    }
  }
}