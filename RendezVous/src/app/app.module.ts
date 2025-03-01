import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material imports
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider'; // Import manquant

// Components
import { Login1Component } from './Patient/Login/login1.component';
import { RegisterComponent } from './Medécin/Auth/register/register.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatCardModule } from '@angular/material/card';
import { NgxFilesizeModule } from 'ngx-filesize';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { MatTooltipModule } from '@angular/material/tooltip';


// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatMenuModule } from '@angular/material/menu';

import { MatDialogModule } from '@angular/material/dialog';

import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RendezVousComponent } from './Medécin/MesRendezVous/rendez-vous/rendez-vous.component';
import { CalendrierComponent } from './Medécin/calendrier/calendrier.component';
import { ProfileComponent } from './Medécin/profile/profile.component';
import { MessagesComponent } from './Medécin/Notifs/messages/messages.component';

import { MatRadioModule } from '@angular/material/radio';
import { PatientDetailsComponent } from './Medécin/MesRendezVous/patient-details/patient-details.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CancelReasonDialogComponent } from './Medécin/MesRendezVous/cancel-reason-dialog/cancel-reason-dialog.component';
import { MedicalRecordComponent } from './Medécin/medical-record/medical-record.component';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from './Medécin/Pipes/truncate/truncate.pipe';
import { MessageDetailComponent } from './Medécin/Notifs/message-detail/message-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Footers/footer/footer.component';
import { QuiSommesNousComponent } from './Footers/qui-sommes-nous/qui-sommes-nous.component';
import { MentionLegalesComponent } from './Footers/mention-legales/mention-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './Footers/politique-de-confidentialite/politique-de-confidentialite.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './Medécin/Auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { authGuard } from './Medécin/Auth/AuthGuard/auth.guard';
import { authInterceptor } from './Medécin/Interceptor/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    Login1Component,
    RendezVousComponent,
    CalendrierComponent,
    ProfileComponent,
    MessagesComponent,
    PatientDetailsComponent,
    CancelReasonDialogComponent,
    MedicalRecordComponent,
    TruncatePipe,
    MessageDetailComponent,
    FooterComponent,
    QuiSommesNousComponent,
    MentionLegalesComponent,
    PolitiqueDeConfidentialiteComponent,
    LoginComponent,
    HomeComponent,
    DoctorCardComponent,
    
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Angular Material Modules (une seule instance de chaque)
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule, // Ajouté ici

    ScrollingModule, // Module pour le scroll virtuel
    
    MatCardModule,
    NgxFilesizeModule,

    MatSidenavModule,
    MatToolbarModule,

    FontAwesomeModule, // Ajouter FontAwesome ici
    MatTooltipModule,
   
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatExpansionModule,
    MatMenuModule,

    MatDialogModule,
    MatListModule,

    MatChipsModule,
    MatAutocompleteModule,

    MatRadioModule, // Ajoute cette ligne

    FullCalendarModule,

    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,

    MatDividerModule,
    MatExpansionModule,
    MatListModule,

    SocialLoginModule,

    MatIconModule,
    

  ],
  providers: [
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'YOUR_GOOGLE_CLIENT_ID' // Remplacez par votre ID client Google
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'YOUR_FACEBOOK_APP_ID' // Remplacez par votre ID d'application Facebook
            )
          },

          { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
          authGuard
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }