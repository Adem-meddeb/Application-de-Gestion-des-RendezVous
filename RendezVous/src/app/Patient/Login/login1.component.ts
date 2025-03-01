import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SocialAuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  standalone : false,  
  styleUrls: ['./login1.component.css'],
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
export class Login1Component implements OnInit {
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  loginAttempts = 0;
  currentImageIndex = 0;
  loginForm: FormGroup;
  isLoginMode = true;
  registerForm: FormGroup;

  images = [
    'assets/1.jpg',
    'assets/2.avif',
    'assets/3.avif',
    'assets/4.avif'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.handleSocialLogin(user);
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginAttempts++;
      this.loginForm.markAllAsTouched();
      return;
    }

    // Appel au service d'authentification
    this.router.navigate(['/patient-dashboard']);
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

  switchMode(loginMode: boolean) {
    this.isLoginMode = loginMode;
    // Réinitialiser les formulaires
    if (loginMode) {
      this.registerForm.reset();
    } else {
      this.loginForm.reset();
    }
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    
    // Logique d'inscription
    console.log('Register data:', this.registerForm.value);
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  private handleSocialLogin(user: SocialUser) {
    // Ici vous pouvez envoyer le token à votre backend
    console.log('Social login data:', user);
    this.router.navigate(['/patient-dashboard']);
  }
}