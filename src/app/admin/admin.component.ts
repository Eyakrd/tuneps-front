import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafePipe } from '../safe.pipe';
import { PowerbidashbordgestionComponent } from '../powerbidashbordgestion/powerbidashbordgestion.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Dashboard, DashboardServiceService} from '../services/dashboard-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,SafePipe, PowerbidashbordgestionComponent],

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {




}
