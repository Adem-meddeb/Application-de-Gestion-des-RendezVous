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
import { Login1Component } from './Auth/login1/login1.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatCardModule } from '@angular/material/card';
import { NgxFilesizeModule } from 'ngx-filesize';
import { FooterComponent } from './Oth/footer/footer.component';

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
import { MessagesComponent } from './Medécin/messages/messages.component';

import { MatRadioModule } from '@angular/material/radio';
import { PatientDetailsComponent } from './Medécin/MesRendezVous/patient-details/patient-details.component';

import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    Login1Component,
    FooterComponent,
    RendezVousComponent,
    CalendrierComponent,
    ProfileComponent,
    MessagesComponent,
    PatientDetailsComponent,
    
  ],
  imports: [
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }