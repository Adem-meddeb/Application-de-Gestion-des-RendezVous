import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  interval: any;
  constructor(
    private fb: FormBuilder,

    
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

  ngOnInit() {
    
  } 

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  year: number = new Date().getFullYear();
}