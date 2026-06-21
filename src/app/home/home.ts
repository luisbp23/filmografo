import {
  Component,
  inject,
  afterNextRender,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Tmdb, TmdbMovie, TrendingWindow } from '../tmdb';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);

  popularMovies: TmdbMovie[] = [];
  trendingMovies: TmdbMovie[] = [];
  trendingWindow: TrendingWindow = 'day';
  isLoadingTrending = false;

  @ViewChild('popularTrack') popularTrackRef?: ElementRef<HTMLDivElement>;
  @ViewChild('trendingTrack') trendingTrackRef?: ElementRef<HTMLDivElement>;

  constructor() {
    afterNextRender(() => {
      this.loadPopular();
      this.loadTrending('day');
    });
  }

  private loadPopular(): void {
    this.tmdb.getPopularMovies().subscribe({
      next: (response) => {
        this.popularMovies = response.results;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar filmes populares:', err);
      }
    });
  }

  loadTrending(window: TrendingWindow): void {
    this.trendingWindow = window;
    this.isLoadingTrending = true;

    this.tmdb.getTrendingMovies(window).subscribe({
      next: (response) => {
        this.trendingMovies = response.results;
        this.isLoadingTrending = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar tendencias:', err);
        this.isLoadingTrending = false;
        this.cdr.detectChanges();
      }
    });
  }

  scrollPopular(direction: 'left' | 'right'): void {
    this.scroll(this.popularTrackRef, direction);
  }

  scrollTrending(direction: 'left' | 'right'): void {
    this.scroll(this.trendingTrackRef, direction);
  }

  private scroll(track: ElementRef<HTMLDivElement> | undefined, direction: 'left' | 'right'): void {
    const element = track?.nativeElement;
    if (!element) {
      return;
    }

    const step = element.clientWidth * 0.8;
    element.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth'
    });
  }
}