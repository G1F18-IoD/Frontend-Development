import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  public username;
  public password;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login() {
    this.authenticationService.login(this.username, this.password).subscribe(() => {
      this.loggedIn.emit(true);
      this.router.navigate(['/home']);
    });
  }

  public register() {
    this.router.navigate(['/register']);
  }

}
