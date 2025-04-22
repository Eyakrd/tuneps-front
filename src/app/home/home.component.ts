import { Component, OnInit, } from '@angular/core';
import { SignalComponent } from '../signal/signal.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import {Dashboard, DashboardServiceService} from '../services/dashboard-service.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

// Interface pour typer le dashboard (à adapter selon ton API)


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SignalComponent, ChatbotComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dash: Dashboard | null = null;
  loading: boolean = false;

  safeUrl: SafeResourceUrl | null = null;
  showChatbot = true;
  loadingg = true;
  constructor(private dashboardService: DashboardServiceService,
              private sanitizer: DomSanitizer,

  ) {
    setTimeout(() => {
      this.loadingg = false;
    }, 2000);
  }

  ngOnInit() {
    this.loading = true;
    this.dashboardService.getDashboardsByType('public').subscribe({
      next: (data) => {
        console.log(data);
        this.dash = data;
        // Ici on sécurise l'URL
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard:', err);
        this.loading = false;
      }
    });
  }
  closeChatbot() {
    this.showChatbot = false;
  }
}
