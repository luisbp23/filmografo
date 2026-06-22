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
import { Tmdb, TmdbMovie, TrendingWindow } from '../../tmdb';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService); // Serviço de Autenticação

  popularMovies: TmdbMovie[] = [];
  trendingMovies: TmdbMovie[] = [];
  trendingWindow: TrendingWindow = 'day';
  isLoadingTrending = false;

  // Variáveis para controlar o título e sessão
  isLoggedIn = false;
  username = '';

  @ViewChild('popularTrack') popularTrackRef?: ElementRef<HTMLDivElement>;
  @ViewChild('trendingTrack') trendingTrackRef?: ElementRef<HTMLDivElement>;

  constructor() {
    afterNextRender(() => {
      this.loadPopular();
      this.loadTrending('day');
    });
  }

  async ngOnInit() {
    // 1. Vai buscar a sessão inicial
    const { data: { session } } = await this.auth.getSession();
    this.atualizarEstadoAutenticacao(session);

    // 2. Fica atento se o utilizador fizer login/logout
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
    
    // Força o Angular a renderizar o ecrã com o novo nome
    this.cdr.detectChanges(); 
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