import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/framework/viewes/home/home.component';
import { UserRegistrationComponent } from './modules/framework/viewes/user-registration/user-registration.component';
import { UserLoginComponent } from './modules/framework/viewes/user-login/user-login.component';
import { GuessStatePracticeComponent } from './modules/chris-norwegian-states/viewes/guess-state-practice/guess-state-practice.component';
import { AuthenticationService } from './modules/framework/services/authentication.service';

const routes: Routes = [
  { path: 'chris-norwegian-states', component: GuessStatePracticeComponent, canActivate: [AuthenticationService] },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
