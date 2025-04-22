import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [RouterLink,HttpClientModule,ChatbotComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  private authService=inject(AuthService);
  private router=inject(Router);
  navigateToChat() {
    if (this.authService.isAuthenticated()) {
      // Already logged in → direct access
      this.router.navigate(['/chat']);
    } else {
      
      this.router.navigate(['/login']);
    }
  }

}
