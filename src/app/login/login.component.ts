import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [FormsModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginobj: Login;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http :HttpClient
  ) {
    this.loginobj = new Login();
  }


  onLogin() {
    this.http.post('http://localhost:8080/api/v1/user/login', this.loginobj)
      .subscribe({
        next: (res: any) => {
          console.log('Full response:', res); // Debug log
          if (res.access_token) {
            localStorage.setItem('jwtToken', res.access_token);
            localStorage.setItem('userRole', res.role);
            this.authService.redirectBasedOnRole();
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          if (err.error && err.error.message) {
            alert(err.error.message); // shows "Employé non autorisé"
          } else {
            alert('Employé non autorisé');

          }
        }
      });
  }

  resetForm() {
    this.loginobj = new Login();
  }

}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
