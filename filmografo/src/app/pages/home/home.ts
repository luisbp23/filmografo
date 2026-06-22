import {
  Component,
  inject,
  afterNextRender,
  ChangeDetectorRef,
  ElementRef,
  ViewChild, 
  OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tmdb, TmdbMovie, TrendingWindow } from '../../tmdb';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService); // Serviço de Autenticação
  
  popularMovies: TmdbMovie[] = [];
  trendingMovies: TmdbMovie[] = [];
  comedyMovies: TmdbMovie[] = []; // <-- NOVA VARIÁVEL
  
  trendingWindow: TrendingWindow = 'day';
  isLoadingTrending = false;
  isLoadingComedy = false; // <-- NOVA VARIÁVEL
  
  // Variáveis para controlar o título e sessão
  isLoggedIn = false;
  username = '';
  
  @ViewChild('popularTrack') popularTrackRef?: ElementRef<HTMLDivElement>;
  @ViewChild('trendingTrack') trendingTrackRef?: ElementRef<HTMLDivElement>;
  @ViewChild('comedyTrack') comedyTrackRef?: ElementRef<HTMLDivElement>; // <-- NOVA REFERÊNCIA
  
  constructor() {
    afterNextRender(() => {
      this.loadPopular();
      this.loadTrending('day');
      this.loadComedy(); // <-- NOVA CHAMADA
    });
  }
  
  async ngOnInit() {
    const { data: { session } } = await this.auth.getSession();
    this.atualizarEstadoAutenticacao(session);
    
    this.auth.onAuthChange((session) => {
      this.atualizarEstadoAutenticacao(session);
    });
  }
  
  private atualizarEstadoAutenticacao(session: any) {
    this.isLoggedIn = !!session;
    
    if (session?.user?.email) {
      this.username = session.user.email.split('@')[0];
    } else {
      this.username = '';
    }
    
    setTimeout(() => this.cdr.detectChanges()); // ← adiciona o setTimeout
  }
  
  private loadPopular(): void {
    this.tmdb.getPopularMovies().subscribe({
      next: (response: any) => {
        this.popularMovies = response.results;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar filmes populares:', err);
      }
    });
  }
  
  loadTrending(window: TrendingWindow): void {
    this.trendingWindow = window;
    this.isLoadingTrending = true;
    
    this.tmdb.getTrendingMovies(window).subscribe({
      next: (response: any) => {
        this.trendingMovies = response.results;
        this.isLoadingTrending = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar tendencias:', err);
        this.isLoadingTrending = false;
        this.cdr.detectChanges();
      }
    });
  }
  
  // --- NOVO MÉTODO PARA COMÉDIAS ---
  private loadComedy(): void {
    this.isLoadingComedy = true;
    this.tmdb.getComedyMovies().subscribe({
      next: (response: any) => {
        this.comedyMovies = response.results;
        this.isLoadingComedy = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar filmes de comédia:', err);
        this.isLoadingComedy = false;
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
  
  // --- NOVO MÉTODO DE SCROLL ---
  scrollComedy(direction: 'left' | 'right'): void {
    this.scroll(this.comedyTrackRef, direction);
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