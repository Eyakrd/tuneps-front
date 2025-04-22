import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signal',
  imports: [RouterLink],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
  private authService=inject(AuthService);
  private router=inject(Router);
  navigateToForm() {
    if (this.authService.isAuthenticated()) {
      // Already logged in → direct access
      this.router.navigate(['/formul']);
    } else {
      
      this.router.navigate(['/login']);
    }
  }
}
