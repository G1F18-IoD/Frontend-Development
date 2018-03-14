import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { JwtTokenHeader, JwtTokenPayload } from '../interfaces/jwttoken';
import { HttpDefined } from '../interfaces/http-defined';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService implements CanActivate {
  constructor(private http: HttpClient, private globalService: GlobalService) { }

  public login(username, password) {
    let reqOption: HttpDefined = {
      requestResource: 'http://skjoldtoft.dk/daniel/hab/index.php',
      data: {
        class: "authentication",
        method: "login", username: username, password: password
      },
      statusCode: [200]
    };

    let headers = new HttpHeaders();
    let retval = this.http.post(reqOption.requestResource, reqOption.data, { headers: headers, observe: 'response' }).map((response: HttpResponse<Object>) => {
      if (reqOption.statusCode.indexOf(response.status) > -1) {
        let data = response.body;
        localStorage.setItem('jwttoken', data[0]);
      } else {
        return Observable.throw("Unexpected answer: " + response.status + " : " + response.statusText + " : " + response.body);
      }
    }).catch((error: HttpResponse<any>) => {
      if (reqOption.statusCode.indexOf(error.status) > -1) {
        console.log(error);
        return error.body;
      } else {
        console.log(error);
        return Observable.throw("Unexpected error!: " + error.status + " : " + error.statusText + " : " + error.body);
      }
    });
    return retval;
  }

  public logout() {
    localStorage.removeItem('jwttoken');
    }

  canActivate() {
    if (this.globalService.isAuth()) {
      return true;
    } else {
      this.globalService.routeTo(['/login']);
      return false;
    }
  }

}
