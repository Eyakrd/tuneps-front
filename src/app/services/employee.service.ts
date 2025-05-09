import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.put<any>(`${this.baseUrl}/update`, employee);
  }

  /* changeStatus(id:number, newStatus: string):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/changeStatus/${id}`,{status: newStatus} );

  } */

  rechercherEmployees(cin: string, email: string): Observable<Employee[]> {
    const params = new HttpParams()
      .set('cin', cin || email)
      .set('email', email);
    return this.http.get<Employee[]>(`${this.baseUrl}/rechercher`, { params });
  }

  updateUserStatus(userId: number, status: string) {
    return this.http.put(`http://localhost:8080/api/employees/user/${userId}/status?status=${status}`, {});
  }

}
