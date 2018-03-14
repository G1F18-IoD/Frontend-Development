import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpDefined, HttpReqsService, AuthenticationService } from '../../framework-export-barrel';
//import { HttpDefined } from '../../interfaces/http-defined';
//import { HttpReqsService } from '../../services/http-reqs.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public username;
  public password;

  constructor(
    private httpReqs: HttpReqsService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit() {
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

  private login() {
    this.authenticationService.login(this.username,this.password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
