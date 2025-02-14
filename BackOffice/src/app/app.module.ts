import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { ContactComponent } from './ContactG/contact/contact.component';
import { ContactDetailsComponent } from './ContactG/contact-details/contact-details.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NotificationComponent } from './Notifications/notification/notification.component';
import { NotificationDetailsComponent } from './Notifications/notification-details/notification-details.component';
import { ImageDialogComponent } from './Users/image-dialog/image-dialog.component';
import { SettingsComponent } from './Setting/settings/settings.component';
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
import { MatRadioModule } from '@angular/material/radio';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpecialiteComponent } from './Spécialite/specialite/specialite.component';
import { AddSpecialityComponent } from './Spécialite/add-speciality/add-speciality.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    EditUserComponent,
    ContactComponent,
    ContactDetailsComponent,
    SideBarComponent,
    NotificationComponent,
    NotificationDetailsComponent,
    ImageDialogComponent,
    SettingsComponent,
    SpecialiteComponent,
    AddSpecialityComponent,
    
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

    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    // Ajouter aussi BrowserAnimationsModule si pas déjà fait
    BrowserAnimationsModule,

    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
