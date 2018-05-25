import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';
import { RpiconnectionService } from '../../../../services/rpiconnection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/*
* The dashboard component is the primary view of the home screen.
* It shows a menu, containing each of the possible options the user has when logged in.
* It also shows a connection bar, allowing the user to know whether a drone is connected or not.
*/
export class DashboardComponent implements OnInit {

  public buttonRowHeaders = ['flight-control', 'drones', 'flightplans', 'logs'];
  public connection = "no connection";

  public state = 0;
  public error;

  constructor(
    private httpReqs: HttpReqsService,
    public rpicon: RpiconnectionService) {
      this.rpicon.connectionChange$.subscribe(
        value => {
          if(value == "connected") {
            this.connection = "connected";
          }
          if(value == "disconnected") {
            this.connection = "no connection";
          }
        }
      );
     }

  ngOnInit() {
    this.initializeConnectionBar();
  }

  /*
  * initializeConnectionBar() makes sure that the connection bar is aware, if a drone is connected upon login.
  */
  private initializeConnectionBar() {
    let connections;

    this.rpicon.getDroneConnections().subscribe((data) => {
      connections = data;
      connections.forEach(element => {
        if (element['status'] === 'connected') {
          this.rpicon.setConnectedRPI(element);
          this.connection = "connected"
        }
      });
    }, error => {
      this.error = error;
    });
  }

  /*
  * setState() sets the currently selected tab.
  */
  public setState(_state) {
    this.state = _state;
  }

  /*
  * disconnectDrone() disconnects a drone via the rpiconnection service and subsequently changes the info
  * shown in the connection bar.
  */
  public disconnectDrone() {
    this.rpicon.disconnectFromDrone().subscribe(() => {
    }, error => {
      this.error = error;
    }, () => {
      this.rpicon.changeConnectionState("disconnected");
      this.connection = "no connection";
    });
  }

}
