import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private auth = inject(AuthService);
  private get db() {
    return this.auth.supabaseClient;
  }

  async getConteudoPendente(tipo: 'movie' | 'tv') {
    const { data, error } = await this.db
      .from('content')
      .select('*')
      .eq('type', tipo)
      .eq('state', 'pending');

    if (error) console.error(error);
    return data ?? [];
  }

  async getDenunciasPendentes() {
    const { data: reports, error } = await this.db
      .from('report')
      .select('*')
      .eq('state', 'pending');

    if (error || !reports) return [];

    const result = await Promise.all(reports.map(async (report) => {
      const { data: review } = await this.db
        .from('review')
        .select('text, userid')
        .eq('id', report.reportedcontent)
        .single();

      const { data: reporter } = await this.db
        .from('user')
        .select('username')
        .eq('id', report.reporter)
        .single();

      const { data: reviewed } = await this.db
        .from('user')
        .select('username')
        .eq('id', review?.userid)
        .single();

      return {
        ...report,
        reporter_username: reporter?.username,
        review_text: review?.text,
        reviewed_username: reviewed?.username
      };
    }));

    return result;
  }

  async aprovar(id: number) {
    const { error } = await this.db
      .from('content')
      .update({ state: 'approved' })
      .eq('id', id);

    if (error) console.error(error);
  }

  async rejeitar(id: number) {
    const { error } = await this.db
      .from('content')
      .update({ state: 'rejected' })
      .eq('id', id);

    if (error) console.error(error);
  }

  async resolverDenuncia(id: number) {
    const { error } = await this.db
      .from('report')
      .update({ state: 'resolved' })
      .eq('id', id);

    if (error) console.error(error);
  }

  async ignorarDenuncia(id: number) {
    const { error } = await this.db
      .from('report')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
  }
}