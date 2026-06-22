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

  // --- NOVOS MÉTODOS ADICIONADOS PARA A META T1 ---

  /** Obter detalhes completos de um filme específico */
  getMovieDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${id}?language=pt-PT&append_to_response=credits,videos&api_key=${this.apiKey}`
    );
  }

  /** Obter detalhes completos de uma série específica */
  getTvShowDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/tv/${id}?language=pt-PT&append_to_response=credits,videos&api_key=${this.apiKey}`
    );
  }

  /** Obter detalhes completos de uma pessoa (ator/realizador) */
  getPersonDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/person/${id}?language=pt-PT&append_to_response=combined_credits&api_key=${this.apiKey}`
    );
  }

  /** Obter filmes do género "Comédia" (O ID do género Comédia no TMDB é o 35) */
  getComedyMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(
      `${this.baseUrl}/discover/movie?with_genres=35&sort_by=popularity.desc&language=pt-PT&api_key=${this.apiKey}`
    );
  }

  /** Obter as séries mais populares */
  getPopularTvShows(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/tv/popular?language=pt-PT&page=1&api_key=${this.apiKey}`
    );
  }

  /** Obter as pessoas (atores/realizadores) mais populares */
  getPopularPeople(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/person/popular?language=pt-PT&page=1&api_key=${this.apiKey}`
    );
  }
}