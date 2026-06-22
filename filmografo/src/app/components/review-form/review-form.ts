import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, MatSliderModule, MatInputModule, MatFormFieldModule, TranslatePipe],
  templateUrl: './review-form.html',
  styleUrl: './review-form.css'
})
export class ReviewForm {
  rating = 3;
  texto = '';

  submit() {
    console.log('Classificação:', this.rating, 'Crítica:', this.texto);
  }
}