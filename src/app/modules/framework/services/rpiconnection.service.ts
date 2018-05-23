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

  /*
  * setConnectedRPI sets "connectedRPI" equal to the given parameter, which is necessary for the frontend
  * to know which drone is currently active.
  */
  public setConnectedRPI(_rpiObject) {
    this.connectedRPI = _rpiObject;
  }

  /*
  * getDroneConnections() returns all drone connections as an observable.
  */
  public getDroneConnections(): Observable<Object> {
    let reqOption: HttpDefined = {
      requestResource: 'api/rpiconnection',
      data: {},
      statusCode: [200]
    };

    return this.httpReqs.sendGetRequest(reqOption);
  }

  /*
  * connectToDrone() is used to connect to a specific drone via its id.
  */
  public connectToDrone(_id): Observable<Object> {
    if (this.connectedRPI == null) {
      return this.setDroneStatus(_id, "connect");
    }
  }

  /*
  * disconnectFromDrone() disconnects from the currently connected drone (connectedRPI).
  */
  public disconnectFromDrone(): Observable<Object> {
    let droneId = this.connectedRPI['rowId'];
    this.connectedRPI = null;
    return this.setDroneStatus(droneId, "disconnect");
  }

  /*
  * changeConnectionsState sets the state of "connectionState".
  * This is used to signal changes to other components, if they're subscribed.
  */
  public changeConnectionState(state) {
    this.connectionState.next(state);
  }

  public executeFlightplanOnDrone(_flightplan, _priority): Observable<Object> {
    let requestURL = 'api/rpiconnection/execute_flightplan/' + this.connectedRPI['rowId'];

    let reqOption: HttpDefined = {
      requestResource: requestURL,
      data: { flightplanName: _flightplan, priority: _priority },
      statusCode: [200]
    };

    return this.httpReqs.sendPostRequest(reqOption);
  }

  /*
  * setDroneStatus() is a private method that can be used to either connect or disconnect
  * from a specific drone.
  */
  private setDroneStatus(_id, _status) {
    let requestURL = "api/rpiconnection/";

    requestURL += _status + "/" + _id;

    let reqOption: HttpDefined = {
      requestResource: requestURL,
      data: {},
      statusCode: [200]
    };

    return this.httpReqs.sendPostRequest(reqOption);
  }
}
