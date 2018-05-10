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
import { DashboardComponent } from './viewes/home/sub-components/dashboard/dashboard.component';
import { FooterComponent } from './viewes/footer/footer.component';
import { PropercasePipe } from './services/propercase.pipe';
import { FlightControlComponent } from './viewes/home/sub-components/flight-control/flight-control.component';
import { DroneSelectorComponent } from './viewes/home/sub-components/drone-selector/drone-selector.component';
import { LogOverviewComponent } from './viewes/home/sub-components/log-overview/log-overview.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent, HomeComponent, UserRegistrationComponent, UserLoginComponent, HeaderComponent, DashboardComponent, FooterComponent, PropercasePipe, FlightControlComponent, DroneSelectorComponent, LogOverviewComponent, AccountMenuComponent],
  providers: [
    HttpReqsService,
    AuthenticationService,
    CommonFunctionsService,
    GlobalService
  ],
  exports: [
    HomeComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class FrameworkModule { }

