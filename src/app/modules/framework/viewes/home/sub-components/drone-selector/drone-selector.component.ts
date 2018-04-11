import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drone-selector',
  templateUrl: './drone-selector.component.html',
  styleUrls: ['./drone-selector.component.css']
})
export class DroneSelectorComponent implements OnInit {

  public headers = ['port','ip','connect'];
  public drones = [{"port":"1024","ip":"localhost"},{"port":"1025","ip":"localhost"}];

  constructor() { }

  ngOnInit() {
  }

}
