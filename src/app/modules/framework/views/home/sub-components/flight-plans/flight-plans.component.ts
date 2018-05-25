import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';

@Component({
  selector: 'app-flight-plans',
  templateUrl: './flight-plans.component.html',
  styleUrls: ['./flight-plans.component.scss']
})
/*
* FlightPlansComponent is a dashboard view component, with the purpose of showing the user
* all registered flightplans and allowing the user to create new ones.
*/
export class FlightPlansComponent implements OnInit {

  public error;
  public headers = ['flightplan ID', 'name', 'author ID', 'created']
  public flightplans;
  public showAddFlightplanBox = false;
  public possibleCommands;

  // New flightplan controls
  public newFlightplanName = "";
  public newFlightplanCommandsAmount = 1;
  public commandAmountToAdd = 1;
  public maxAllowedCommands = 0;
  public newFlightplanCommands = {};

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.getFlightplans();
    this.getCommands();
    this.getFlightplanSettings();
  }

  /*
  * getFlightplans() retrieves flightplans from the backend, so that they can be shown in the HTML.
  * Dates are formatted from Unix time.
  */
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

  /*
  * getCommands() retrieves possible commands from the backend.
  * These commands are used when a new flightplan is being added, to prevent the user
  * from adding disallowed or unknown commands.
  */
  private getCommands() {
    let reqOption: HttpDefined = {
      requestResource: 'api/command/',
      data: {},
      statusCode: [200]
    };
    this.httpReqs.sendGetRequest(reqOption).subscribe((data) => {
      this.possibleCommands = data;

    }, error => {
      this.error = error;
    });
  }

  /*
  * formatFlightplanDates() formats UNIX timestamps into readable dates from a given flightplan.
  */
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

  /*
  * getFlightplanSettings() gets possible settings from the backend,
  * such as max number of allowed commands.
  */
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

  /*
  * setNewFlightplanCommandsAmount() sets the selected amount of commands, 
  * when adding a new flightplan.
  */
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

  /*
  * showHideAddFlightplanBox() resets input entered when adding a new flightplan,
  * and either hides or shows the "add flightplan" box.
  */
  public showHideAddFlightplanBox() {
    // Reset inputs, etc.
    this.newFlightplanName = "";
    this.newFlightplanName = "";
    this.newFlightplanCommandsAmount = 1;
    this.commandAmountToAdd = 1;

    // Set show variable
    this.showAddFlightplanBox = !this.showAddFlightplanBox;
  }

  /*
  * checkCommandInput() ensures that the user does not exceed the maximum allowed number of commands,
  * when adding a new flightplan.
  */
  public checkCommandInput() {
    setTimeout(() => {
      if (this.commandAmountToAdd <= 0) {
        this.commandAmountToAdd = 1;
      } else if (this.commandAmountToAdd > this.maxAllowedCommands) {
        this.commandAmountToAdd = this.maxAllowedCommands;
      }
    });
  }

  /*
  * createNewFlightplan() sends a POST request to the server, telling it that a new flightplan has been made.
  * It also initiates "addCommandToNewFlightplan()".
  */
  public createNewFlightplan() {
    if (this.newFlightplanName != null && this.newFlightplanName != "") {
      let reqOption: HttpDefined = {
        requestResource: 'api/flightplan/',
        data: { name: this.newFlightplanName },
        statusCode: [200]
      };

      this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {
        this.addCommandToNewFlightplan(data['rowId'])
      }, error => {
        this.error = error;
      });
    }
  }

  /*
  * addCommandToNewFlightplan() takes a flightplan id as a parameter.
  * It then adds all entered commands to said flightplan, one by one.
  * Lastly, it calls getFlightplans() to refresh the table data and then hides the flightplan box.
  */
  private addCommandToNewFlightplan(_flightplan_id) {
    Object.keys(this.newFlightplanCommands).forEach(key => {
      setTimeout(() => {
        let paramString = this.newFlightplanCommands[key]['params'];
        let params = paramString.split("-");

        for (let i = 0; i < params.length; i++) {
          params[i] = parseFloat(params[i]);
        }

        let reqOption: HttpDefined = {
          requestResource: 'api/flightplan/cmd/' + _flightplan_id,
          data: { cmd: this.newFlightplanCommands[key].cmd, message: this.newFlightplanCommands[key].message, parameters: params, order: parseFloat(key) },
          statusCode: [200]
        };

        this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {

        }, error => {
          this.error = error;
        });
      }, 800);
    });

    this.getFlightplans();
    this.showHideAddFlightplanBox();
  }

}
