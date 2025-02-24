import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
// Dans votre composant
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';


@Component({
  selector: 'app-login1',
  standalone: false,
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css',
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
  showScrollButton = false;

  loginForm: FormGroup;
  submitted = false;
  currentImageIndex = 0;
  interval: any;
  constructor(
    private fb: FormBuilder,
    //private authService: AuthService,
    private router: Router

    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
/*
    // Appel au service d'authentification
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']); // Redirection après succès
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        // Afficher un message d'erreur (ex: "Identifiants incorrects")
      }
    });*/
  }


  images = [
    'assets/1.jpg',
    'assets/2.avif',
    'assets/3.avif',
    'assets/4.avif'
  ];

  

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentImageIndex = 
        this.currentImageIndex === this.images.length - 1 
          ? 0 
          : this.currentImageIndex + 1;
    }, 2000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  year: number = new Date().getFullYear();

  ToRegister() {
    this.router.navigate(['/register']);
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Gestion de l'affichage du bouton
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }
}
