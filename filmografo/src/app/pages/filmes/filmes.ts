import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tmdb, TmdbMovie } from '../../tmdb';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './filmes.html',
  styleUrl: './filmes.css'
})
export class Filmes implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  
  filmes: TmdbMovie[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.tmdb.getPopularMovies().subscribe({
      next: (response: any) => {
        this.filmes = response.results;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar catálogo de filmes:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}