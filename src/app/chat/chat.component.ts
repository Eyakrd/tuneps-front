import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule], // Standalone component declaration
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userQuestion: string = '';  // The question entered by the user
    // The response from the chatbot
  conversation: Array<{role: string, content: string}> = [];
  isLoading: boolean = false; // To show loading indicator when waiting for response
// Example suggestions
  @ViewChild('scrollMe') private conversationContainer!: ElementRef; // Reference to the scroll element
  constructor(private chatService: ChatServiceService) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.warn('Erreur de scroll automatique :', err);
    }
  }
  sendMessage() {
    const question = this.userQuestion.trim();
    if (!question) return;

    this.isLoading = true;
    this.chatService.addToHistory('user', question); // Add user question to conversation history
    this.userQuestion = ''; // Clear the input field

    this.chatService.sendMessage(question).subscribe({
      next: (response) => {
        this.chatService.addToHistory('bot', response.response); // Add bot response to conversation history
        this.conversation=[...this.chatService.getHistory()]; // Update the conversation with the history
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l’appel API :', error);
        this.chatService.addToHistory('bot', "Erreur de connexion");
        this.conversation = [...this.chatService.getHistory()];
        this.isLoading = false;
      }
    });
    }
  }
  

