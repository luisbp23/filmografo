import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Tmdb } from '../../../tmdb';
import { ReviewForm } from '../../../components/review-form/review-form';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-filme-detalhe',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DecimalPipe, ReviewForm, RouterLink, TranslatePipe],
  templateUrl: './filme-detalhe.html',
  styleUrl: './filme-detalhe.css'
})
export class FilmeDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);

  filme: any = null;
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
    this.tmdb.getMovieDetails(id).subscribe({
      next: (data) => {
        this.filme = data;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Detalhes do Filme:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do filme:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}