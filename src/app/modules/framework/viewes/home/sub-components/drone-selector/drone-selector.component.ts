import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-drone-selector',
  templateUrl: './drone-selector.component.html',
  styleUrls: ['./drone-selector.component.scss']
})
/*
* The DroneSelectorComponent is considered a sub-component of dashboard,
* as it is only used within said component.
*
* The purpose of this component is to provide a view, where drones (RPi's) connected
* to the backend are made available for the user.
* 
* This view allows the user to pick a drone and connect to it via the user interface.
*/
export class DroneSelectorComponent implements OnInit {

  public headers = ['ip','port','status','connect'];
  public availableDrones: any;
  
  public error;

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.getDroneList();
  }

  /*
  * getDroneList() sends a GET request to the backend.
  * This request returns an array consisting of JSON objects.
  * 
  * Each object holds information about the drone and is displayed 
  * as a row in the corresponding HTML table via the "availableDrones" variable.
  */
  private getDroneList() {
    let reqOption: HttpDefined = {
      requestResource: 'http://tek-uas-stud0b.stud-srv.sdu.dk/api/rpiconnection',
      data: {},
      statusCode: [200]
    };
    this.httpReqs.sendGetRequest(reqOption).subscribe((data) => {
      this.availableDrones = data;

    }, error => {
      this.error = error;
    });
  }

  /*
  * refresh() is used as a public method, so that the corresponding HTML button
  * can refresh the table data, in case new drones are made available.
  */
  public refresh() {
    this.getDroneList();
  }

}
