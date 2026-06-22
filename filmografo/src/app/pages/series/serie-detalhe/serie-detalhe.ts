import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Tmdb } from '../../../tmdb';
import { ReviewForm } from '../../../components/review-form/review-form';

@Component({
  selector: 'app-serie-detalhe',
  standalone: true,
  imports: [DatePipe, DecimalPipe, ReviewForm],
  templateUrl: './serie-detalhe.html',
  styleUrl: './serie-detalhe.css'
})
export class SerieDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef); // <-- Injetado aqui

  serie: any = null;
  isLoading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarDetalhes(id);
      }
    });
  }

  private carregarDetalhes(id: string): void {
    this.isLoading = true;
    this.tmdb.getTvShowDetails(id).subscribe({
      next: (data) => {
        this.serie = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização do HTML
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da série:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização do HTML mesmo com erro
      }
    });
  }
}