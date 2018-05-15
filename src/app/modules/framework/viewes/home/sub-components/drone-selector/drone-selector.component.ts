import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-drone-selector',
  templateUrl: './drone-selector.component.html',
  styleUrls: ['./drone-selector.component.scss']
})
export class DroneSelectorComponent implements OnInit {

  public headers = ['ip','port','status','connect'];
  public availableDrones: any;
  public error;

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.getDroneList();
  }

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

  public refresh() {
    this.getDroneList();
  }

}
