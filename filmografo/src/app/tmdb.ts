import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
  private apiKey = environment.tmdbKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  getPopularMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/movie/popular?language=pt-PT&page=1&api_key=${this.apiKey}`
    );
  }

  getTrendingMovies(window: TrendingWindow = 'day'): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/trending/movie/${window}?language=pt-PT&api_key=${this.apiKey}`
    );
  }

  search(query: string): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/search/multi?query=${encodeURIComponent(query)}&language=pt-PT&api_key=${this.apiKey}`
    );
  }
}