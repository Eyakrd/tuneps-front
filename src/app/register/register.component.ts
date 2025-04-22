import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [FormsModule,HttpClientModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { firstname: '', lastname: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.validateEmail(this.user.email)) {
      alert("Invalid email address format!");
      return;
    }

    this.http.post('http://localhost:8080/api/v1/user/register', this.user)
      .subscribe({
        next: (res: any) => {
          alert("Registration successful!");
          this.router.navigate(['/login']); // Redirect to login after successful registration
        },
        error: (err) => {
          alert(err.error.message );
          this.user = { firstname: '', lastname: '', email: '', password: '' }; // Reset form on failure
        }
      });
  }
  

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}