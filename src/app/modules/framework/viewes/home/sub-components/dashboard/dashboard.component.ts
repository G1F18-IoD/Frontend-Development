import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public list = [['Connections','10'],['Speed','10'],['Altitude','10'],['Battery','10']];

  constructor() { }

  ngOnInit() {
  }

}
