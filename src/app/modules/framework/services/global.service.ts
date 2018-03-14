import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenPayload } from '../framework-export-barrel';

@Injectable()
export class GlobalService {

  constructor(private router: Router) { }



  public getToken(): JwtTokenPayload {
    if (this.isAuth()) {
      let token = localStorage.getItem('jwttoken');
      let splitToken = token.split('.');
      return JSON.parse(atob(splitToken[1]));
    } else {
      return null;
    }
  }

  public isAuth(): boolean {
    let token = localStorage.getItem('jwttoken');
    if (token) {
      let splitToken = token.split('.');
      let tokenPayload: JwtTokenPayload = JSON.parse(atob(splitToken[1]));
      if (tokenPayload.expire < (Date.now() / 1000)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public routeTo(routeArgs: Array<any>): void {

    this.router.navigate(routeArgs);
  }

}
