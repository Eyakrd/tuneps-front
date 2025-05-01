import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Employee {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  cin: string;
  password: string;
  status?: 'ACTIVE' | 'INACTIVE';
}
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addemployee`, employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employee);
  }

  /* changeStatus(id:number, newStatus: string):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/changeStatus/${id}`,{status: newStatus} );

  } */
}
