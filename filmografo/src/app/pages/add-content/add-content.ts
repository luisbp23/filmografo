import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-content.html',
  styleUrl: './add-content.css'
})
export class AddContent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  contentForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  creatorId: string | null = null;

  async ngOnInit() {
    this.initForm();
    await this.obterCreatorId();
  }

  private initForm() {
    this.contentForm = this.fb.group({
      type: ['movie', Validators.required], // 'movie' ou 'series'
      title: ['', Validators.required],
      genre: [''],
      imageurl: [''],
      synopsis: [''],
      state: ['Lançado'],
      duration: [null],  // Campo específico para Filmes
      episodes: [null]   // Campo específico para Séries
    });

    // Sempre que mudar de Filme para Série, limpa o campo oposto
    this.contentForm.get('type')?.valueChanges.subscribe(type => {
      if (type === 'movie') {
        this.contentForm.get('episodes')?.setValue(null);
      } else {
        this.contentForm.get('duration')?.setValue(null);
      }
    });
  }

  // Descobre o ID (int8) da tua tabela 'user' com base na sessão atual
  async obterCreatorId() {
    const { data: { session } } = await this.auth.getSession();
    if (session?.user?.id) {
      this.creatorId = session.user.id;
    }
  }

  async onSubmit() {
    if (this.contentForm.invalid) return;
    if (!this.creatorId) {
      this.errorMessage = 'Erro: Não foi possível identificar o teu utilizador.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValues = this.contentForm.value;

    const payload: any = {
      creator: this.creatorId,
      type: formValues.type,
      title: formValues.title,
      imageurl: formValues.imageurl,
      genre: formValues.genre,
      synopsis: formValues.synopsis,
      state: formValues.state
    };

    if (formValues.type === 'movie') payload.duration = formValues.duration;
    if (formValues.type === 'series') payload.episodes = formValues.episodes;

    try {
      const { error } = await this.auth.supabaseClient
        .from('content')
        .insert([payload]);

      if (error) throw error;

      const tipoTexto = formValues.type === 'movie' ? 'Filme' : 'Série';
      this.successMessage = `${tipoTexto} enviado para aprovação! Será publicado após revisão de um administrador.`;
      
      // Reinicia o formulário mantendo as definições padrão
      this.contentForm.reset({ type: formValues.type, state: 'Lançado' });
      
      // Redireciona de volta à Home após 2 segundos
      setTimeout(() => this.router.navigate(['/']), 2000);

    } catch (err: any) {
      console.error(err);
      this.errorMessage = err.message || 'Erro ao guardar na base de dados.';
    } finally {
      this.isLoading = false;
    }
  }
}