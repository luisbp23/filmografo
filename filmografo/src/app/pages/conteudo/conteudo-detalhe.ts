import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-conteudo-detalhe',
  standalone: true,
  imports: [],
  templateUrl: './conteudo-detalhe.html',
  styleUrl: './conteudo-detalhe.css'
})
export class ConteudoDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  conteudo: any = null;
  isLoading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.carregarDetalhes(id);
    });
  }

  private async carregarDetalhes(id: string): Promise<void> {
    this.isLoading = true;
    const { data, error } = await this.auth.supabaseClient
      .from('content')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao carregar conteúdo:', error);
    } else {
      this.conteudo = data;
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  voltar(): void {
    history.back();
  }
}