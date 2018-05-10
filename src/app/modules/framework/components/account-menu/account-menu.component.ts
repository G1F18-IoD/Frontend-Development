import { Component, OnInit } from '@angular/core';
import { JwtTokenPayload } from '../../interfaces/jwttoken';
import { GlobalService } from '../../services/global.service';
import { AuthenticationService } from '../../framework-export-barrel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  public username = "";

  private auth = false;

  constructor(private globalService: GlobalService,
    private authServ: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.auth = this.globalService.isAuth();
    if (this.auth) {
      let tokenPayload: JwtTokenPayload = this.globalService.getToken();
      this.username = tokenPayload.username;
    }
  }

  public logout() {
    this.authServ.logout();
    this.router.navigate(['/login']);
  }

}
