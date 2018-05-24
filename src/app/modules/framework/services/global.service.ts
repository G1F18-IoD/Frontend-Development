import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenPayload, HttpDefined } from '../framework-export-barrel';

@Injectable()
/*
* GlobalService is used to get global information about the system from anywhere.
*/
export class GlobalService {

  constructor(private router: Router) { }

  /*
  * If the user is logged in and a token is generated,
  * getToken() returns this token.
  */
  public getToken(): JwtTokenPayload {
    if (this.isAuth()) {
      let token = localStorage.getItem('jwttoken');
      let splitToken = token.split('.');
      return JSON.parse(atob(splitToken[1]));
    } else {
      return null;
    }
  }

  /*
  * isAuth() checks whether the user is logged in or not,
  * to prevent running methods that require login.
  */
  public isAuth(): boolean {
    let token = localStorage.getItem('jwttoken');
    if (token) {
      let splitToken = token.split('.');
      let tokenPayload: JwtTokenPayload = JSON.parse(atob(splitToken[1]));
      if (tokenPayload.exp < (Date.now() / 1000)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  /*
  * routeTo() simply navigates to a given route.
  */
  public routeTo(routeArgs: Array<any>): void {

    this.router.navigate(routeArgs);
  }

}
