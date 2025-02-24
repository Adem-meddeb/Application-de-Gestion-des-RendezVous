import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { Login1Component } from './Auth/Login/login1.component';

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

const routes: Routes = [
  // Redirection de la racine vers /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Routes publiques (sans sidebar)
  { path: 'login', component: Login1Component },
  { path: 'register', component: RegisterComponent },

  //Medécin
  { path: 'RendezVous', component: RendezVousComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Messages', component: MessagesComponent },
  { path: 'Calendrier', component: CalendrierComponent },
  { path: 'footer', component: FooterComponent },

  {
    path: 'dossier-medical/:id',
    component: MedicalRecordComponent
  },

  {
    path: 'messages/:id',
    component: MessageDetailComponent
  },

  {
    path: 'QuiSommesNous', component : QuiSommesNousComponent
  },
  {
    path: 'MentionsLegales', component : MentionLegalesComponent
  },
  {
    path:'PolitiqueDeConfidentialite' , component : PolitiqueDeConfidentialiteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }