import { Component, OnInit } from '@angular/core';
import { DashboardServiceService,Dashboard } from '../services/dashboard-service.service';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerbidashbordgestion',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './powerbidashbordgestion.component.html',
  styleUrl: './powerbidashbordgestion.component.css'
})
export class PowerbidashbordgestionComponent implements OnInit  {
  title = '';
  url = '';
  type ='';
  active = true;



  message: string = '';
  dashboards: Dashboard[] | null = null;
  loading: boolean = false;
  selectedDashboard: Dashboard | null = null;

  safeUrlAll: SafeResourceUrl | null = null;
  constructor(private dashboardService: DashboardServiceService, protected sanitizer: DomSanitizer) { }
  selectDashboard(dash: Dashboard) {
    this.selectedDashboard = dash;
  }

  closeDashboard() {
    this.selectedDashboard = null;
  }

  addDashboard() {
    if(this.title && this.url) {
      const dashboard = { title: this.title, url: this.url, type: this.type,
        active: this.active};

      this.dashboardService.addDashboard(dashboard).subscribe(response => {
        console.log('Dashboard added successfully', response);
        this.message = 'Dashboard ajouté avec succès !';
        this.title = '';
        this.url = '';
        this.type = '';
        this.active = true;
        if (this.dashboards) {
          this.dashboards.push(response);
        } else {
          this.dashboards = [response];
        }
      }, error => {
        console.error('Erreur lors de l\'ajout du dashboard', error);
        this.message = 'Erreur lors de l\'ajout !';
      });
    } else {
      this.message = 'Veuillez remplir tous les champs !';
    }
}
  ngOnInit() {
    this.loading = true;
    this.dashboardService.getAllDashboard().subscribe({
      next: (data) => {
        // On trie les dashboards par date (du plus récent au plus ancien)
        this.dashboards = data.sort((a: Dashboard, b: Dashboard) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        console.log(this.dashboards);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard:', err);
        this.loading = false;
      }
    });
  }




}
