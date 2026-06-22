import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Tmdb } from '../../../tmdb';

@Component({
  selector: 'app-pessoa-detalhe',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pessoa-detalhe.html',
  styleUrl: './pessoa-detalhe.css'
})
export class PessoaDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(Tmdb);
  private cdr = inject(ChangeDetectorRef); // <-- Injetado aqui

  pessoa: any = null;
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
    this.tmdb.getPersonDetails(id).subscribe({
      next: (data: any) => {
        this.pessoa = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização do HTML
      },
      error: (err: any) => {
        console.error('Erro ao carregar detalhes da pessoa:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Força a atualização do HTML mesmo com erro
      }
    });
  }
}
