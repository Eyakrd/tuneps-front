import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ChatServiceService {
  private conversationHistory: Array<{role: string, content: string}> = []; // To store the conversation history

  constructor(private http:HttpClient) { }
  sendMessage(userQst: string): Observable<any> {
    return this.http.post<any>('http://localhost:8031/ask', { question: userQst });
  }
  getHistory(): Array<{role: string, content: string}> {
    return this.conversationHistory;
  }

  addToHistory(role: string, content: string) {
    this.conversationHistory.push({role, content});
  }

  clearHistory() {
    this.conversationHistory = [];
  }
  
  
}
