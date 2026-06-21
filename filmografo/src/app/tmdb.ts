import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  [key: string]: unknown;
}

export interface TmdbMovieResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export type TrendingWindow = 'day' | 'week';

@Injectable({
  providedIn: 'root'
})
export class Tmdb {
  private http = inject(HttpClient);

  /**
   * Todas as chamadas vão para o nosso próprio servidor (proxy), nunca
   * diretamente para a TMDB. Isto evita CORS no browser e mantém o token
   * da TMDB apenas no servidor.
   */
  getPopularMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>('/api/movies/popular?language=pt-PT&page=1');
  }

  getTrendingMovies(window: TrendingWindow = 'day'): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `/api/movies/trending?window=${window}&language=pt-PT`
    );
  }

  search(query: string): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `/api/search?query=${encodeURIComponent(query)}&language=pt-PT`
    );
  }

}