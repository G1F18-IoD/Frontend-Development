import { Injectable } from '@angular/core';
import { HttpDefined } from '../interfaces/http-defined';
import { HttpReqsService } from './http-reqs.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
/*
* This service handles connection to an RPI. 
* It ensures that only one RPI can be connected to.
* It also makes sure that drone/RPI functionality can be shared throughout the system.
*/
export class RpiconnectionService {

  public connectedRPI = null;

  constructor(private httpReqs: HttpReqsService) { }

  public connectToDrone(_id): Observable<Object> {
    if (this.connectedRPI == null) {
      return this.setDroneStatus(_id, "connected");
    }
  }

  public disconnectFromDrone(_id): Observable<Object> {
    this.connectedRPI = null;
    return this.setDroneStatus(_id, "disconnected");
  }

  private setDroneStatus(_id, _status) {
    let requestURL = "http://tek-uas-stud0b.stud-srv.sdu.dk/api/rpiconnection/status/";
    let connectionStatus = _status; // Is an ENUM dependant on backend implementation

    requestURL += _id;

    let reqOption: HttpDefined = {
      requestResource: requestURL,
      data: { status: connectionStatus },
      statusCode: [200]
    };

    return this.httpReqs.sendPostRequest(reqOption);
  }
}
