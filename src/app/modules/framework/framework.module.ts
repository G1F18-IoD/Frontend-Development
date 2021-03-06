import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpReqsService } from './services/http-reqs.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonFunctionsService } from './services/common-functions.service';
import { GlobalService } from './services/global.service';
import { HttpClient } from '@angular/common/http/src/client';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { UserRegistrationComponent } from './views/user-registration/user-registration.component';
import { UserLoginComponent } from './views/user-login/user-login.component';
import { HeaderComponent } from './views/header/header.component';
import { DashboardComponent } from './views/home/sub-components/dashboard/dashboard.component';
import { FooterComponent } from './views/footer/footer.component';
import { PropercasePipe } from './pipes/propercase.pipe';
import { FlightControlComponent } from './views/home/sub-components/flight-control/flight-control.component';
import { DroneSelectorComponent } from './views/home/sub-components/drone-selector/drone-selector.component';
import { LogOverviewComponent } from './views/home/sub-components/log-overview/log-overview.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { FeedbackBoxComponent } from './components/feedback-box/feedback-box.component';
import { FlightPlansComponent } from './views/home/sub-components/flight-plans/flight-plans.component';
import { TimesPipe } from './pipes/times.pipe';
import { RpiconnectionService } from './services/rpiconnection.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent, 
    HomeComponent, 
    UserRegistrationComponent, 
    UserLoginComponent, 
    HeaderComponent, 
    DashboardComponent, 
    FooterComponent, 
    PropercasePipe, 
    FlightControlComponent, 
    DroneSelectorComponent, 
    LogOverviewComponent, 
    AccountMenuComponent, 
    FeedbackBoxComponent, 
    FlightPlansComponent, TimesPipe
  ],
  providers: [
    HttpReqsService,
    AuthenticationService,
    CommonFunctionsService,
    GlobalService,
    RpiconnectionService
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

