import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders, HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { HttpDefined } from '../framework-export-barrel';

@Injectable()
export class HttpReqsService {

  //private standardReqURL = "http://tek-uas-stud0b.stud-srv.sdu.dk/";
  public standardReqURL = "http://192.168.0.19:5021/";

  constructor(private http: HttpClient) { }

  sendPostRequest(reqOption: HttpDefined) {
    let reqResource = this.standardReqURL + reqOption.requestResource;
    let headers = new HttpHeaders({'AuthToken': localStorage.getItem("jwttoken")});
    //headers.append('authorization', localStorage.getItem("jwttoken"));
    //reqOption.data.jwt_token = localStorage.getItem('jwttoken');
    let retval = this.http.post(reqResource, reqOption.data, { headers: headers, observe: 'response' }).map((response: HttpResponse<Object>) => {
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

  sendGetRequest(reqOption: HttpDefined) {
    let reqResource = this.standardReqURL + reqOption.requestResource;
    let headers = new HttpHeaders({'AuthToken': localStorage.getItem("jwttoken")});
    //headers.append('authorization', localStorage.getItem("jwttoken"));
    //reqOption.data.jwt_token = localStorage.getItem('jwttoken');
    let retval = this.http.get(reqResource, { headers: headers, observe: 'response' }).map((response: HttpResponse<Object>) => {
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