import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { firstname: '', lastname: '', email: '', password: '' };
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.errorMessage = '';
    if (!this.isFormValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement ';
      return;
    }
    else if(!this.validateEmail(this.user.email)){
      this.errorMessage = 'L\'adresse email n\'est pas dans un format valide';
      return;
    }
    else if(!this.validateMDP(this.user.password)){
      this.errorMessage = 'Le MDP Mdp : (+8 caractères, +1 majuscule, +1 minuscule, +1 chiffre, +1 symbole)';
      return;
    }

    this.http.post('http://localhost:8080/api/v1/user/register', this.user)
      .subscribe({
        next: (res: any) => {
          alert("Inscription réussie !!");
          this.router.navigate(['/login']); // Redirect to login after successful registration
        },
        error: (err) => {
          alert("Erreur lors de l'inscription.")
          this.errorMessage = err.error?.message || "Email deja Exist";
          this.user = { firstname: '', lastname: '', email: '', password: '' }; // Reset form on failure
        }
      });
  }


  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
    isFormValid(): boolean {
      const { firstname, lastname, email, password } = this.user;
      return firstname.trim() !== '' &&
        lastname.trim() !== '' &&
        password.trim() !== ''

    }

  private validateMDP(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  }
}
