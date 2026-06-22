// services/review.ts
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private auth = inject(AuthService);
  private get db() { return this.auth.supabaseClient; }

  async getReviewsByContent(contentId: number, contentType: 'movie' | 'tv') {
    const { data, error } = await this.db
      .from('review')
      .select('*, user(username)')
      .eq('contentid', contentId)
      .eq('contenttype', contentType);

    if (error) console.error(error);
    return data ?? [];
  }

  calcularMedia(reviews: any[]): number {
    if (!reviews.length) return 0;
    const soma = reviews.reduce((acc, r) => acc + r.aval, 0);
    return Math.round((soma / reviews.length) * 10) / 10;
  }
}