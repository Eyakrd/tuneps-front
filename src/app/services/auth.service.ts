import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
