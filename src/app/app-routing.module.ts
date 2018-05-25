import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/framework/viewes/home/home.component';
import { UserRegistrationComponent } from './modules/framework/viewes/user-registration/user-registration.component';
import { UserLoginComponent } from './modules/framework/viewes/user-login/user-login.component';
import { AuthenticationService } from './modules/framework/services/authentication.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationService] },
  //{ path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },

  { path: '**', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }