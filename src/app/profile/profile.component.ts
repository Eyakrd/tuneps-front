import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  employee = {
    firstname: '',
    lastname: '',
    email: '',
    cin: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil :', err);
      }
    });
  }

  getMaskedPassword(): string {
    if (!this.employee.password) return '';
    return '*'.repeat(this.employee.password.length);
  }
  openPasswordPrompt() {
    const modal = new bootstrap.Modal(document.getElementById('passwordModal'));
    modal.show();
  }
  passwordInput = '';
  errorMessage = '';
  verifyPassword() {
    this.authService.verifyPassword(this.passwordInput).subscribe({
      next: (isValid) => {
        if (isValid) {
          const modal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
          modal.hide();
          this.router.navigate(['/edit-profile']);
        } else {
          this.errorMessage = 'Mot de passe incorrect';
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la vérification';
        console.error(err);
      }
    });

}}


