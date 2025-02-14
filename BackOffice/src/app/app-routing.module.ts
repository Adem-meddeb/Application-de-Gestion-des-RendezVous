import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { NotificationComponent } from './Notifications/notification/notification.component';
import { ContactComponent } from './ContactG/contact/contact.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [

  // Redirection de la racine vers /login
  { path: '', redirectTo: '/utilisateurs', pathMatch: 'full' },

  // Routes protégées avec layout (avec sidebar)
  { 
    path: '',
    component: SideBarComponent,
    children: [
      //Admin
      { path: 'utilisateurs', component: UserListComponent },
      { path: 'edit', component:EditUserComponent},
      { path: 'notification', component:NotificationComponent},
      { path: 'contacts', component:ContactComponent},
      { path: 'settings', component:SettingsComponent},

      
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
