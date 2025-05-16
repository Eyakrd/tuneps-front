import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
  isEmployee: boolean = false;

  constructor(private AuthService:AuthService,private router: Router){}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.isEmployee = role === 'EMPLOYEE';
  }


  public isLoggedIn(){
    return this.AuthService.isLoggedIn();
  }
  public logout(){
    this.AuthService.clear();
    this.router.navigate(['/home']);

  }
  goToProfile() {
    this.router.navigate(['/profile']); // vers la route du composant profil
  }


}
