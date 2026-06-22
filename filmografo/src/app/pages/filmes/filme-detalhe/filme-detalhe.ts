import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tmdb } from '../../../tmdb';
import { ReviewForm } from '../../../components/review-form/review-form';
import { AuthService } from '../../../services/auth';
import { ReviewService } from '../../../services/review';
import { ReportService } from '../../../services/report';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-filme-detalhe',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DecimalPipe, ReviewForm, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './filme-detalhe.html',
  styleUrl: './filme-detalhe.css'
})
export class FilmeDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);
  private reviewService = inject(ReviewService);
  private reportService = inject(ReportService);

  filme: any = null;
  isLoading = true;
  isLoggedIn = false;
  reviews: any[] = [];
  mediaAval = 0;

  denunciaAberta = -1;
  denunciaReason = '';
  denunciaDesc = '';
  denunciaLoading = false;

  async ngOnInit() {
    const { data: { session } } = await this.auth.getSession();
    this.isLoggedIn = !!session;
    this.auth.onAuthChange(session => {
      this.isLoggedIn = !!session;
      this.cdr.detectChanges();
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.carregarDetalhes(id);
    });
  }

  private carregarDetalhes(id: string): void {
    this.isLoading = true;
    this.tmdb.getMovieDetails(id).subscribe({
      next: (data: any) => {
        this.filme = data;
        this.isLoading = false;
        this.carregarReviews();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erro ao carregar detalhes do filme:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  async carregarReviews() {
    this.reviews = await this.reviewService.getReviewsByContent(this.filme.id, 'movie');
    this.mediaAval = this.reviewService.calcularMedia(this.reviews);
    this.cdr.detectChanges();
  }

  denunciar(reviewId: number) { this.denunciaAberta = reviewId; }
  cancelarDenuncia() { this.denunciaAberta = -1; }

  async submeterDenuncia() {
    this.denunciaLoading = true;
    const { error } = await this.reportService.denunciarReview(
      this.denunciaAberta, this.denunciaReason, this.denunciaDesc
    );
    this.denunciaLoading = false;
    if (!error) {
      this.denunciaAberta = -1;
      this.denunciaReason = '';
      this.denunciaDesc = '';
    }
  }
}