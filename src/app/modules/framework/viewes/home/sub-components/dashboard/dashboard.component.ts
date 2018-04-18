import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public buttonRowHeaders = ['flight-control','drones','logs'];
  public connection = "no connection";

  public state = 0;

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
  }

  public setState(_state) {
    this.state = _state;
  }

  public setConnection() {
    
  }

}
