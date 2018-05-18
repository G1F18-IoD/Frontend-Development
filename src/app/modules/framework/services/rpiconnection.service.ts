import { Injectable } from '@angular/core';
import { HttpDefined } from '../interfaces/http-defined';
import { HttpReqsService } from './http-reqs.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
/*
* This service handles connection to an RPI. 
* It ensures that only one RPI can be connected to.
* It also makes sure that drone/RPI functionality can be shared throughout the system.
*/
export class RpiconnectionService {

  public connectedRPI = null;

  // Observable detecting changes in connection
  public connectionState = new Subject<string>();
  public connectionChange$ = this.connectionState.asObservable();

  constructor(private httpReqs: HttpReqsService) { }

  public setConnectedRPI(_rpiObject) {
    this.connectedRPI = _rpiObject;
  }

  public getDroneConnections(): Observable<Object> {
    let reqOption: HttpDefined = {
      requestResource: 'http://tek-uas-stud0b.stud-srv.sdu.dk/api/rpiconnection',
      data: {},
      statusCode: [200]
    };

    return this.httpReqs.sendGetRequest(reqOption);
  }

  public connectToDrone(_id): Observable<Object> {
    if (this.connectedRPI == null) {
      return this.setDroneStatus(_id, "connect");
    }
  }

  public disconnectFromDrone(): Observable<Object> {
    let droneId = this.connectedRPI['rowId'];
    this.connectedRPI = null;
    return this.setDroneStatus(droneId, "disconnect");
  }

  public changeConnectionState(state) {
    this.connectionState.next(state);
  }

  private setDroneStatus(_id, _status) {
    let requestURL = "http://tek-uas-stud0b.stud-srv.sdu.dk/api/rpiconnection/";

    requestURL += _status + "/" + _id;

    let reqOption: HttpDefined = {
      requestResource: requestURL,
      data: {},
      statusCode: [200]
    };

    return this.httpReqs.sendGetRequest(reqOption);
  }
}
