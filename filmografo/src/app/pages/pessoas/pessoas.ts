import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css'
})
export class Pessoas implements OnInit {
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef); // <-- Injetado aqui
  
  pessoas: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.tmdb.getPopularPeople().subscribe({
      next: (response: any) => {
        this.pessoas = response.results;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização
      },
      error: (err: any) => {
        console.error('Erro ao carregar catálogo de pessoas:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}