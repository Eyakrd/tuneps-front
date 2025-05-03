import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxCaptchaModule ,ReCaptcha2Component  } from 'ngx-captcha'; // Import du service
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-formul',
  templateUrl: './formul.component.html',
  styleUrls: ['./formul.component.css'],
  standalone: true,
  imports:[NgxCaptchaModule,ReactiveFormsModule]
})
export class FormulComponent implements OnInit {
  demande = {
    typeDec: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    statutSocial: '',
    texteAppel: ''
  };


  @ViewChild('captchaRef') captchaRef!: ReCaptcha2Component;
  selectedFile: File | null = null;
  aFormGroup!: FormGroup;
  siteKey: string = "6LdUrR8rAAAAADmsN1QnQbRvsSb1qUePEAvB1vpm"; // reCAPTCHA Site Key

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      typeDec: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      statutSocial: ['', Validators.required],
      texteAppel: ['', Validators.required],
      recaptcha: ['', Validators.required]  // Add validation for reCAPTCHA
    });

    const role = localStorage.getItem('userRole');
    if (role !== 'USER') {
      alert('You are not authorized to access this form');
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (role === 'EMPLOYEE') {
        this.router.navigate(['/employee']);
      } else {
        this.router.navigate(['/default']);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  resolved(captchaResponse: string): void {
    this.aFormGroup.get('recaptcha')?.setValue(captchaResponse);
  }

  onSubmit(): void {
    if (this.aFormGroup.invalid) {
      alert("Veuillez valider le reCAPTCHA avant de soumettre.");
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      alert("Token missing. Please log in again.");
      this.router.navigate(['/login']);
      return;
    }

    const formData = new FormData();
    formData.append('typeDec', this.aFormGroup.get('typeDec')?.value);
    formData.append('nom', this.aFormGroup.get('nom')?.value);
    formData.append('email', this.aFormGroup.get('email')?.value);
    formData.append('telephone', this.aFormGroup.get('telephone')?.value);
    formData.append('adresse', this.aFormGroup.get('adresse')?.value);
    formData.append('statutSocial', this.aFormGroup.get('statutSocial')?.value);
    formData.append('texteAppel', this.aFormGroup.get('texteAppel')?.value);

    // Append reCAPTCHA token
    const recaptchaToken = this.aFormGroup.get('recaptcha')?.value;
    formData.append('recaptchaToken', recaptchaToken);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ${token}'
    });

    this.http.post('http://localhost:8080/api/demandes/ajouterDemande', formData, {headers})
      .subscribe(
        (response) => {
          console.log('Demande ajoutée:', response);
          alert('Demande ajoutée avec succès!');
          this.aFormGroup.reset();      // reset le formGroup
          this.selectedFile = null; //fichier a null
          this.captchaRef.resetCaptcha();
        },
        (error) => {
          console.error('Erreur:', error);
          if (error.status === 403) {
            alert('Accès refusé. Vous n’avez pas les permissions nécessaires.');
          } else {
            alert('Erreur lors de l’ajout de la demande.');
          }
        }
      );
  }}
