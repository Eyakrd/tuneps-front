import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  resetForm: FormGroup;
  codeSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Par défaut, on désactive les champs code/pwd
    this.resetForm.get('code')?.disable();
    this.resetForm.get('newPassword')?.disable();
  }

  get email() {
    return this.resetForm.get('email');
  }

  get code() {
    return this.resetForm.get('code');
  }

  get newPassword() {
    return this.resetForm.get('newPassword');
  }

  onSubmit() {
    if (!this.codeSent) {
      const email = this.email?.value;
      if (!email) return;

      this.authService.checkEmail(email).subscribe({
        next: () => {
          this.codeSent = true;
          this.code?.enable();
          this.newPassword?.enable();
          alert('Code envoyé par email.');
        },
        error: err => {
          alert('Email invalide.');
          console.error(err);
        }
      });
    } else {
      const { email, code, newPassword } = this.resetForm.getRawValue();
      if (!code || !newPassword) {
        alert('Champs manquants');
        return;
      }

      this.authService.resetPassword(email, code, newPassword).subscribe({
        next: () => {
          alert('Mot de passe réinitialisé.');
          this.router.navigate(['/login']);
        },
        error: err => {
          alert('Code invalide ou expiré.');
          console.error(err);
        }
      });
    }
  }
}
