import { Component, OnInit } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { SafePipe } from '../safe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-dashboard',
  standalone: true,
  imports: [SafePipe,CommonModule],
  templateUrl: './display-dashboard.component.html',
  styleUrl: './display-dashboard.component.css'
})
export class DisplayDashboardComponent {}
