import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 private readonly TOKEN_KEY = 'jwtToken';
 private readonly ROLE_KEY = 'userRole';
  private authUrl = 'http://localhost:8080/api/v1/user';

  private demandeUrl='http://localhost:8080/api/demandes'

  private isLogged=false;
  constructor(private http: HttpClient, private router: Router) {}
    register(user:any): Observable<any>{
      return this.http.post(`${this.authUrl}/register`, user);

    }
    login(credentials: any): Observable<any> {
      return this.http.post(`${this.authUrl}/login`, credentials);
    }

    setLoggedIn(value: boolean): void {
      this.isLogged = value;
    }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.authUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  verifyPassword(password: string) {
    const token = this.getToken();
    return this.http.post<boolean>('http://localhost:8080/api/v1/user/verify-password', { password }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  updateUserProfile(employee: any) {
    const token = this.getToken();
    return this.http.put(`${this.authUrl}/updateProfile`, employee, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  }

    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    isAuthenticated(): boolean {
      return !!this.getToken();
    }
    getRole(): string | null {
      return localStorage.getItem(this.ROLE_KEY);
    }

    logout() {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ROLE_KEY);
      this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean{
      return !!localStorage.getItem(this.TOKEN_KEY);
    }

    public clear(): void {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem(this.ROLE_KEY);
      this.isLogged = false;
      this.router.navigate(['/login']);
    }
    redirectBasedOnRole(): void {
      const role = this.getRole();

      switch(role) {
        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;
        case 'EMPLOYEE':
          this.router.navigate(['/employee']);
          break;
        case 'USER':
          this.router.navigate(['/home']);
          break;
        default:
          this.router.navigate(['/default']); // Fallback for unknown roles
      }}



    ajouterDemande(demande : any): Observable<any>{
      return this.http.post(`${this.demandeUrl}/ajouterDemande`,demande);
    }
    obtenirToutesLesDemandes(): Observable<any[]>{
      return this.http.get<any[]>(`${this.demandeUrl}/liste`);
    }


  checkEmail(email : any ):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/checkEmail`,{email}).pipe(
      map(
        response => {
          return response;
        }
      )
    )
  }

  resetPassword(email: any,code:any,password:any):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/resetPassword`,{email,code,password}).pipe(
      map(
        response => {
          return response;
        }
      )
    )
  }




}
