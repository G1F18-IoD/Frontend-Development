import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders, HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { HttpDefined } from '../framework-export-barrel';

@Injectable()
export class HttpReqsService {

  constructor(private http: HttpClient) { }

  sendPostRequest(reqOption: HttpDefined) {
    let headers = new HttpHeaders();
    //headers.append('authorization', this.authenticationService.getToken());
    reqOption.data.jwt_token = localStorage.getItem('jwttoken');
    let retval = this.http.post(reqOption.requestResource, reqOption.data, { headers: headers, observe: 'response' }).map((response: HttpResponse<Object>) => {
      if (reqOption.statusCode.indexOf(response.status) > -1) {
        return response.body;
      } else {
        return Observable.throw("Unexpected answer: " + response.status + " : " + response.statusText + " : " + response.body);
      }
    }).catch((error: HttpResponse<any>) => {
      if (reqOption.statusCode.indexOf(error.status) > -1) {
        return error.body;
      } else {
        return Observable.throw("Unexpected error: " + error.status + " : " + error.statusText + " : " + error.body);
      }
    });
    return retval;
  }

}

//export class HttpDefined;