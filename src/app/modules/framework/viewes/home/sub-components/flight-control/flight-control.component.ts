import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {

  public possibleCommands = ["RUN &ltpreset&gt", "ARM", "HELP"];
  public commands = [];
  public currentCommand;
  public uniqID = new Date();

  constructor() { }

  ngOnInit() {
    this.possibleCommands.sort();
  }

  public enterCommand(_string) {
    var elements = _string.split(" ");

    this.commands.push("> " + _string.toUpperCase());
    this.commands.push(this.handleCommand(elements[0], elements[1]));

    setTimeout(() => {
      var elem = document.getElementById('flight-console');
      elem.scrollTop = elem.scrollHeight;

      var feedback = document.getElementById(this.uniqID + "+" + (this.commands.length - 1));
      var returnSplit = this.handleCommand(elements[0], elements[1]).split(" ");
      feedback.style.color = this.getStatusColor(returnSplit[0]);
    }, 0);

    this.currentCommand = null;
  }

  private getStatusColor(_input) {
    switch(_input.toUpperCase()) {
      case "RUNNING":
      case "SUCCESS":
        return "lightgreen";
      case "UNKNOWN":
      case "ERROR":
        return "red";
    }
  }

  private handleCommand(_input, _input2?) {
    switch (_input.toUpperCase()) {
      case "ARM":
        return "SUCCESS - Arming sucessful";
      case "RUN":
        if (_input2 != null && _input2 != undefined && _input2 != "") {
          return "RUNNING - " + _input2;
        } else {
          return "ERROR - No preset defined. Use 'RUN &ltpreset-name&gt'.";
        }
      case "HELP":
        var helpString = "The following commands are available:<br />";
        this.possibleCommands.forEach(element => {
          helpString += "- " + element + "<br />";
        });
        return helpString;
      case "ANDERS":
        return "Is numbah 1!";
      default:
        return "UNKNOWN - Use 'HELP' to get a list of commands.";
    }
  }

}
