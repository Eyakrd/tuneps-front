import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Dashboard {
    id?: number;
    title: string;
    url: string;
    createdAt?: string;
    type: string;
    active : boolean;


}

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private apiUrl = 'http://localhost:8080/api/dashboards';

  constructor(private http: HttpClient) { }


  addDashboard(dashboard: Dashboard) {
    return this.http.post<Dashboard>(this.apiUrl, dashboard);
  }
  getDashboard():Observable<any> {
    return this.http.get<any>(this.apiUrl+"/last");
  }
  getAllDashboard():Observable<any> {
    return this.http.get<any>(this.apiUrl+"/allDashbords");
  }
  getDashboardsByType(type: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/type/${type}`);
  }
}
