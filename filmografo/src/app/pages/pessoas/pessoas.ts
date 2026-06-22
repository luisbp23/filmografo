import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css'
})
export class Pessoas implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  
  pessoas: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.tmdb.getPopularPeople().subscribe({
      next: (response: any) => {
        this.pessoas = response.results;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar catálogo de pessoas:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}