import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { Login1Component } from './Auth/login1/login1.component';

import { ProfileComponent } from './Medécin/profile/profile.component';
import { MessagesComponent } from './Medécin/messages/messages.component';
import { CalendrierComponent } from './Medécin/calendrier/calendrier.component';
import { RendezVousComponent } from './Medécin/MesRendezVous/rendez-vous/rendez-vous.component';

const routes: Routes = [
  // Redirection de la racine vers /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Routes publiques (sans sidebar)
  { path: 'login', component: Login1Component },
  { path: 'register', component: RegisterComponent },

  //Medécin
  { path: 'RendezVous', component:RendezVousComponent},
  { path: 'Profile', component:ProfileComponent},
  { path: 'Messages', component:MessagesComponent},
  { path: 'Calendrier', component:CalendrierComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }