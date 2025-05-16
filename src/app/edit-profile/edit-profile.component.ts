import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
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


  saveProfile() {
    this.authService.updateUserProfile(this.employee).subscribe({
      next: (res:any) => {
        alert(res.message || 'Profil mis à jour avec succès');
        window.location.reload();
      },
      error: (err) => {
        alert('Erreur lors de la mise à jour');
        console.error(err);
      }
    });
  }
  isPasswordVerified = false;

openPasswordPrompt() {
  if(!this.isPasswordVerified){
  const modal = new bootstrap.Modal(document.getElementById('passwordModal'));
  modal.show();
}}
passwordInput = '';
errorMessage = '';
verifyPassword() {
  this.authService.verifyPassword(this.passwordInput).subscribe({
    next: (isValid) => {
      if (isValid) {
        this.isPasswordVerified = true;
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
