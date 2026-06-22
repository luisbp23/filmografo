import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './series.html',
  styleUrl: './series.css'
})
export class Series implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef); // <-- Injetado aqui
  
  series: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.tmdb.getPopularTvShows().subscribe({
      next: (response: any) => {
        this.series = response.results;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização
      },
      error: (err: any) => {
        console.error('Erro ao carregar catálogo de séries:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}