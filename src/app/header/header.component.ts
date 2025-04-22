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
  constructor(private AuthService:AuthService,private router: Router){}

  ngOnInit():void{}

  public isLoggedIn(){
    return this.AuthService.isLoggedIn();
  }
  public logout(){
    this.AuthService.clear();
    this.router.navigate(['/home']);
    
  }

}
