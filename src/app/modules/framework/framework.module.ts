import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpReqsService } from './services/http-reqs.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonFunctionsService } from './services/common-functions.service';
import { GlobalService } from './services/global.service';
import { HttpClient } from '@angular/common/http/src/client';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './viewes/home/home.component';
import { UserRegistrationComponent } from './viewes/user-registration/user-registration.component';
import { UserLoginComponent } from './viewes/user-login/user-login.component';
import { HeaderComponent } from './viewes/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent, HomeComponent, UserRegistrationComponent, UserLoginComponent, HeaderComponent],
  providers: [
    HttpReqsService,
    AuthenticationService,
    CommonFunctionsService,
    GlobalService
  ],
  exports: [
    HomeComponent,
    UserRegistrationComponent,
    UserLoginComponent
  ]
})
export class FrameworkModule { }

