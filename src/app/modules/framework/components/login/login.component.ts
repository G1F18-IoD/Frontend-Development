import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  public username;
  public password;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public login() {
    this.authenticationService.login(this.username,this.password).subscribe(() => {
      this.loggedIn.emit(true);
    });
  }

}
