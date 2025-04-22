import { Component } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,CommonModule ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  showHeader=true;
  constructor(private router:Router){}
  ngOnInit(){
    this.router.events.pipe(
      filter(event =>event instanceof  NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        if(currentRoute === '/admin' || currentRoute === '/login'){
          this.showHeader = false;
        }
        else{
          this.showHeader=true;
        }
      });
    
  }
}
