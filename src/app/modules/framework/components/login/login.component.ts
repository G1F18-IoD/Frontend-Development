import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HttpDefined } from '../../interfaces/http-defined';
import { HttpReqsService } from '../../framework-export-barrel';

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
    private httpReqs: HttpReqsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private globalService: GlobalService
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
    let reqOption: HttpDefined = {
      requestResource: 'http://skjoldtoft.dk/daniel/hab/index.php',
      data: {class: "authentication",
      method: "register", username: this.username, password: this.password },
      statusCode: [200]
    };
    this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {
      this.login();
    });
  }

}
