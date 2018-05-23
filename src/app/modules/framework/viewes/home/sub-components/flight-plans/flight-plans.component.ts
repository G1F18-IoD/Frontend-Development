import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-flight-plans',
  templateUrl: './flight-plans.component.html',
  styleUrls: ['./flight-plans.component.scss']
})
export class FlightPlansComponent implements OnInit {

  public error;
  public headers = ['flightplan ID', 'name', 'author ID', 'created']
  public flightplans;
  public showAddFlightplanBox = false;

  // New flightplan controls
  public newFlightplanName = "";
  public newFlightplanCommandsAmount = 1;
  public commandAmountToAdd = 1;
  public maxAllowedCommands = 0;
  public newFlightplanCommands = {};

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.getFlightplans();
    this.getFlightplanSettings();
  }

  private getFlightplans() {
    let reqOption: HttpDefined = {
      requestResource: 'api/flightplan',
      data: {},
      statusCode: [200]
    };
    this.httpReqs.sendGetRequest(reqOption).subscribe((data) => {

      this.flightplans = data;
      this.formatFlightplanDates(this.flightplans);

    }, error => {
      this.error = error;
    });
  }

  private formatFlightplanDates(_flightplans) {
    Object.keys(_flightplans).forEach(key => {

      // Get Unix timestamp
      let time = this.flightplans[key].createdAt;

      // Split time
      let date = new Date(time * 1000);

      let year = date.getFullYear();
      let month = "0" + date.getMonth();
      let day = "0" + date.getDay();

      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let seconds = "0" + date.getSeconds();

      // Format
      let formattedTime = day.substr(-2) + "-" + month.substr(-2) + "-" + year + " " + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      this.flightplans[key].createdAt = formattedTime;
    });
  }

  private getFlightplanSettings() {
    let reqOption: HttpDefined = {
      requestResource: 'api/flightplan/settings',
      data: {},
      statusCode: [200]
    };
    this.httpReqs.sendGetRequest(reqOption).subscribe((data) => {
      this.maxAllowedCommands = data['commandPerFlightplanCount'];

      for (let i = 0; i < this.newFlightplanCommandsAmount; i++) {
        this.newFlightplanCommands[i] = {};
      }

    }, error => {
      this.error = error;
    });
  }

  public setNewFlightplanCommandsAmount() {
    if (this.commandAmountToAdd !== null) {
      let addAmount = this.commandAmountToAdd;
      let amount = this.newFlightplanCommandsAmount + addAmount;

      if (amount > this.maxAllowedCommands) {
        this.newFlightplanCommandsAmount = this.maxAllowedCommands;
      } else {
        this.newFlightplanCommandsAmount = addAmount
      }

      this.commandAmountToAdd = this.newFlightplanCommandsAmount;

      for (let i = 0; i < this.newFlightplanCommandsAmount; i++) {
        this.newFlightplanCommands[i] = {};
      }
    }
  }

  public showHideAddFlightplanBox() {
    // Reset inputs, etc.
    this.newFlightplanName = "";
    this.newFlightplanName = "";
    this.newFlightplanCommandsAmount = 1;
    this.commandAmountToAdd = 1;

    // Set show variable
    this.showAddFlightplanBox = !this.showAddFlightplanBox;
  }

  public checkCommandInput() {
    setTimeout(() => {
      if (this.commandAmountToAdd <= 0) {
        this.commandAmountToAdd = 1;
      } else if (this.commandAmountToAdd > this.maxAllowedCommands) {
        this.commandAmountToAdd = this.maxAllowedCommands;
      }
    });
  }

  public createNewFlightplan() {
    if (this.newFlightplanName != null && this.newFlightplanName != "") {
      let reqOption: HttpDefined = {
        requestResource: 'api/flightplan/',
        data: { name: this.newFlightplanName },
        statusCode: [200]
      };

      this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {
        this.getFlightplans();
        this.addCommandToNewFlightplan(data['rowId'])
      }, error => {
        this.error = error;
      });
    }
  }

  private addCommandToNewFlightplan(_flightplan_id) {
    Object.keys(this.newFlightplanCommands).forEach(key => {
      let paramString = this.newFlightplanCommands[key]['params'];
      let parameters = paramString.split(" ");

      let reqOption: HttpDefined = {
        requestResource: 'api/flightplan/cmd/' + _flightplan_id,
        data: { cmd: this.newFlightplanCommands[key].cmd, message: this.newFlightplanCommands[key].message, params: parameters, order: key },
        statusCode: [200]
      };

      this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {

      }, error => {
        this.error = error;
      });
    });
  }

}
