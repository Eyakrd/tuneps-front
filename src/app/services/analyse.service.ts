import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private apiUrl = 'http://localhost:5001/api/analyseSignalement'; //my backend api flask


  constructor(private http: HttpClient) { }

  analyserSignalement(texte: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { texte });
  }
}
