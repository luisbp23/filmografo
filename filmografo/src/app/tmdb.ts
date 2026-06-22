import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LanguageService } from './services/language';

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

@Injectable({ providedIn: 'root' })
export class Tmdb {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private apiKey = environment.tmdbKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  getPopularMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/movie/popular?language=${this.lang.tmdbLang}&page=1&api_key=${this.apiKey}`
    );
  }

  getTrendingMovies(window: TrendingWindow = 'day'): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/trending/movie/${window}?language=${this.lang.tmdbLang}&api_key=${this.apiKey}`
    );
  }

  search(query: string): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/search/multi?query=${encodeURIComponent(query)}&language=${this.lang.tmdbLang}&api_key=${this.apiKey}`
    );
  }

  getMovieDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${id}?language=${this.lang.tmdbLang}&append_to_response=credits,videos&api_key=${this.apiKey}`
    );
  }

  getTvShowDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/tv/${id}?language=${this.lang.tmdbLang}&append_to_response=credits,videos&api_key=${this.apiKey}`
    );
  }

  getPersonDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/person/${id}?language=${this.lang.tmdbLang}&append_to_response=combined_credits&api_key=${this.apiKey}`
    );
  }

  getComedyMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/discover/movie?with_genres=35&sort_by=popularity.desc&language=${this.lang.tmdbLang}&api_key=${this.apiKey}`
    );
  }

  getPopularTvShows(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/tv/popular?language=${this.lang.tmdbLang}&page=1&api_key=${this.apiKey}`
    );
  }

  getPopularPeople(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/person/popular?language=${this.lang.tmdbLang}&page=1&api_key=${this.apiKey}`
    );
  }
}