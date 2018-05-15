import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-drone-selector',
  templateUrl: './drone-selector.component.html',
  styleUrls: ['./drone-selector.component.css']
})
export class DroneSelectorComponent implements OnInit {

  public headers = ['port','ip','connect'];
  public availableDrones: any;

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.getDroneList();
  }

  private getDroneList() {
    //Not implemented
  }

  public refresh() {
    this.getDroneList();
  }

}
