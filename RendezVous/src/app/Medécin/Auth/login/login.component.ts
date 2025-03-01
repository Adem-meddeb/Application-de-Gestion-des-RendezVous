import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthServiceService } from '../../Services/AuthService/auth-service.service';


@Component({
  selector: 'app-login1',
  templateUrl: './login.component.html',
  standalone : false,  
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('800ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginAttempts = 0;
  currentImageIndex = 0;
  loginForm: FormGroup;
  isLoginMode = true;

  errorMessage = '';
  loading = false;

  images = [
    'assets/1.jpg',
    'assets/2.avif',
    'assets/3.avif',
    'assets/4.avif'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.loading = false,
      error: (error) => {
        this.loading = false;
        this.loginAttempts++;
        this.handleLoginError(error);
      }
    });
  }

  private handleLoginError(error: any): void {
    switch(error.status) {
      case 401: 
        this.errorMessage = 'Email ou mot de passe incorrect';
        break;
      case 403:
        this.errorMessage = 'Compte en attente de validation par un administrateur';
        break;
      default:
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
    }
  }

  getCarouselText(index: number): string {
    const texts = [
      'Votre Santé en Premier',
      'Gestion de Rendez-vous Simplifiée',
      'Suivi Médical en Temps Réel'
    ];
    return texts[index] || 'Portail Patient Sécurisé';
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value 
      ? null : {'mismatch': true};
  }

}