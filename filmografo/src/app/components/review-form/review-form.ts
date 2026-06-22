import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.css',
})
export class ReviewForm {
  rating = 3;
  texto = '';

  submit() {
    console.log(this.rating, this.texto);
  }
}
