import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {

  public list = [['Connections','10'],['Speed','10'],['Altitude','10'],['Battery','10']];

  constructor() { }

  ngOnInit() {
  }

}
