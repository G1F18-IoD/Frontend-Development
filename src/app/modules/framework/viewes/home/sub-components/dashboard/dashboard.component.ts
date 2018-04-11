import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public buttonRowHeaders = ['flight-control','drones','logs'];
  public connection = "no connection";

  public state = 0;

  constructor() { }

  ngOnInit() {
  }

  public setState(_state) {
    this.state = _state;
  }

}
