import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Medécin/Auth/register/register.component';
import { Login1Component } from './Patient/Login/login1.component';

import { ProfileComponent } from './Medécin/profile/profile.component';
import { MessagesComponent } from './Medécin/Notifs/messages/messages.component';
import { CalendrierComponent } from './Medécin/calendrier/calendrier.component';
import { RendezVousComponent } from './Medécin/MesRendezVous/rendez-vous/rendez-vous.component';
import { MedicalRecordComponent } from './Medécin/medical-record/medical-record.component';
import { MessageDetailComponent } from './Medécin/Notifs/message-detail/message-detail.component';
import { FooterComponent } from './Footers/footer/footer.component';
import { QuiSommesNousComponent } from './Footers/qui-sommes-nous/qui-sommes-nous.component';
import { MentionLegalesComponent } from './Footers/mention-legales/mention-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './Footers/politique-de-confidentialite/politique-de-confidentialite.component';
import { LoginComponent } from './Medécin/Auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Medécin/Auth/AuthGuard/auth.guard';

const routes: Routes = [
  // Redirection de la racine vers /login
  { path: '', redirectTo: '/Acceuil', pathMatch: 'full' },

  // Routes publiques (sans sidebar)
  { path: 'LoginPatient', component: Login1Component },
  { path: 'LoginMedecin', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Medécin
  { path: 'RendezVous', component: RendezVousComponent , canActivate: [authGuard], data: { role: 'ROLE_DOCTOR' } },
  { path: 'Profile', component: ProfileComponent , canActivate: [authGuard], data: { role: 'ROLE_DOCTOR' } },
  { path: 'Messages', component: MessagesComponent , canActivate: [authGuard], data: { role: 'ROLE_DOCTOR' } },
  { path: 'Calendrier', component: CalendrierComponent , canActivate: [authGuard], data: { role: 'ROLE_DOCTOR' } },
  { path: 'footer', component: FooterComponent },

  { path: 'dossier-medical/:id', component: MedicalRecordComponent },

  { path: 'messages/:id', component: MessageDetailComponent },

  { path: 'QuiSommesNous', component: QuiSommesNousComponent },

  { path: 'MentionsLegales', component: MentionLegalesComponent },
  { path: 'PolitiqueDeConfidentialite', component: PolitiqueDeConfidentialiteComponent },

  { path: 'Acceuil', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }