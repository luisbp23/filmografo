import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignUp {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }
  
  async onSubmit() {
    if (this.signupForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    try {
      const { username, password } = this.signupForm.value;
      const fakeEmail = `${username}@filmografo.com`;
      
      const { data, error } = await this.auth.signUp(fakeEmail, password);
      
      if (error) {
        this.errorMessage = error.message === 'User already registered'
        ? 'Este utilizador já existe.'
        : 'Erro ao criar conta. Tenta novamente.';
      } else if (data.user) {
        await this.auth.supabaseClient
        .from('user')
        .insert({
          id: data.user.id,
          username: username,
          role: 'user'
        });
        
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.errorMessage = 'Não foi possível ligar ao servidor. Verifica a tua ligação.';
      console.error('Erro no SignUp:', error);
    } finally {
      this.isLoading = false;
    }
  }
}