import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private auth = inject(AuthService);
  private get db() { return this.auth.supabaseClient; }

  async denunciarReview(reviewId: number, reason: string, description: string) {
    const { data: { user } } = await this.db.auth.getUser();
    if (!user) return { error: 'Não autenticado' };

    const { error } = await this.db
      .from('report')
      .insert({
        reporter: user.id,
        reportedcontent: reviewId,
        reason: reason,
        description: description,
        state: 'pending'
      });

    return { error };
  }
}