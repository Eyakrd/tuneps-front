import { Component , OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AnalyseService} from '../services/analyse.service';
declare var bootstrap: any;
@Component({
  selector: 'app-signalement-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './signalement-admin.component.html',
  styleUrl: './signalement-admin.component.css'
})
export class SignalementAdminComponent implements OnInit {

  demandes: any[]=[];

  selectedSignalement: string = '';

  analysedResults: any = null;
  constructor(private demandeService: AuthService ,private analyseService:AnalyseService) {
  }
  ngOnInit() :void{
    this.demandeService.obtenirToutesLesDemandes().subscribe({
      next: (data) => {
        this.demandes = data;
        console.log('Demandes récupérées :', data); // debug
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des demandes :', err);
      }
    });

  }

  popupVisible = false;


  ouvrirPopup(texte: string): void {
    this.selectedSignalement = texte;
    this.popupVisible = true;
  }

  fermerPopup(): void {
    this.popupVisible = false;
  }

  analyserSignalement(texte: string): void {
    this.analyseService.analyserSignalement(texte).subscribe(
      (response) => {
        // Afficher l'alerte avec le texte et l'analyse du signalement
        const message = `
          Texte du signalement: ${texte}\n
          Gravité: ${response.gravite}\n
          Type de signalement: ${response.suggestionType}\n
          Résumé: ${response.resume}
        `;
        alert(message);
      },
      (error) => {
        console.error('Erreur lors de l\'analyse du signalement:', error);
        alert('Une erreur est survenue lors de l\'analyse.');
      }
    );
  }
}
