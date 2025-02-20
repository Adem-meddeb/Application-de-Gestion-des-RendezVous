import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { NotificationComponent } from './Notifications/notification/notification.component';
import { ContactComponent } from './ContactG/contact/contact.component';
import { SettingsComponent } from './Setting/settings/settings.component';
import { LoginComponent } from './Auth/login/login.component';
import { SpecialiteComponent } from './Spécialite/specialite/specialite.component';
import { authGuard } from './Guard/auth.guard';

const routes: Routes = [

  // Redirection de la racine vers /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Routes publiques (sans sidebar)
  { path: 'login', component: LoginComponent },
  
  // Routes protégées avec layout (avec sidebar)
  { 
    path: '',
    component: SideBarComponent, canActivate: [authGuard],
    children: [
      //Admin
      { path: 'utilisateurs', component: UserListComponent, canActivate: [authGuard] },
      { path: 'edit', component:EditUserComponent , canActivate: [authGuard]},
      { path: 'notification', component:NotificationComponent , canActivate: [authGuard]},
      { path: 'contacts', component:ContactComponent , canActivate: [authGuard]},
      { path: 'settings', component:SettingsComponent , canActivate: [authGuard]},
      { path: 'specialites', component:SpecialiteComponent , canActivate: [authGuard]},

      
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
