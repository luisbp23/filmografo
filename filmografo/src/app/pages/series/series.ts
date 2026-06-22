import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './series.html',
  styleUrl: './series.css'
})
export class Series implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  
  series: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.tmdb.getPopularTvShows().subscribe({
      next: (response: any) => {
        this.series = response.results;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar catálogo de séries:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}