import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';
import { RpiconnectionService } from '../../../../services/rpiconnection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public buttonRowHeaders = ['flight-control', 'drones', 'flightplans', 'logs'];
  public connection = "no connection";

  public state = 0;

  constructor(
    private httpReqs: HttpReqsService,
    private rpicon: RpiconnectionService) { }

  ngOnInit() {
    this.initializeConnectionBar();
  }

  private initializeConnectionBar() {
    let connections;

    this.rpicon.getDroneConnections().subscribe((data) => {
      connections = data;
      connections.forEach(element => {
        if (element['status'] === 'connected') {
          this.connection = "connected"
          this.rpicon.setConnectedRPI(element);
        }
      });
    }, error => {

    });
  }

  public setState(_state) {
    this.state = _state;
  }

  public setConnection() {

  }

  public connectionChanged(event) {
    this.connection = event;
  }

}
