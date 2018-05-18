import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';
import { RpiconnectionService } from '../../../../services/rpiconnection.service';

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
* This view allows the user to pick a drone and connect/disconnect to it via the user interface.
*/
export class DroneSelectorComponent implements OnInit {
  @Output() rpiConnectionChanged = new EventEmitter();

  public headers = ['ip', 'port', 'status', 'connect'];
  public availableDrones: any;

  public error;

  constructor(
    private httpReqs: HttpReqsService,
    private rpicon: RpiconnectionService) {

  }

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
    this.rpicon.getDroneConnections().subscribe((data) => {
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
    this.error = null;
    this.getDroneList();
  }

  /*
  * createInitialConnectionToDrone() tries to connect to the selected drone.
  * This is done via the RpiconnectionService.
  * If succesful, the connectedRPI is set to be equal to the drone.
  */
  public createInitialConnectionToDrone(_index: number) {
    this.error = null;
    let droneID = this.availableDrones[_index].rowId;

    this.rpicon.connectToDrone(droneID).subscribe((data) => {
      this.rpicon.setConnectedRPI(data);
    }, error => {
      this.error = error;
    }, () => {
      this.refresh();
      this.rpiConnectionChanged.emit("connected");
    });
  }

  /*
  * disconnectFromDrone() disconnects from a connected drone,
  * via the RpiconnectionService.
  */
  public disconnectFromDrone(_index: number) {
    this.error = null;
    let droneID = this.availableDrones[_index].rowId;

    this.rpicon.disconnectFromDrone().subscribe((data) => {
      
    }, error => {
      this.error = error;
    }, () => {
      this.refresh();
      this.rpiConnectionChanged.emit("no connection");
    });
  }

}
