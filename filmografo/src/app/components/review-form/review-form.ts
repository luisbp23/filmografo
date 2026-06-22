import { Component, Input, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-review-form',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.css',
})
export class ReviewForm {
  @Input() contentId!: number;
  @Input() contentType!: 'movie' | 'tv';

  private auth = inject(AuthService);

  rating = 3;
  texto = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  async submit() {
    if (!this.texto.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { data: { user } } = await this.auth.supabaseClient.auth.getUser();

    if (!user) {
      this.errorMessage = 'Tens de estar autenticado para submeter uma crítica.';
      this.isLoading = false;
      return;
    }

    const { error } = await this.auth.supabaseClient
      .from('review')
      .insert({
        userid: user.id,
        contentid: this.contentId,
        contenttype: this.contentType,
        aval: this.rating,
        text: this.texto
      });

    if (error) {
      this.errorMessage = 'Erro ao submeter crítica. Tenta novamente.';
      console.error(error);
    } else {
      this.successMessage = 'Crítica submetida com sucesso!';
      this.texto = '';
      this.rating = 3;
    }

    this.isLoading = false;
  }
}