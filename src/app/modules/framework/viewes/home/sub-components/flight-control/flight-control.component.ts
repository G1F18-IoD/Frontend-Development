import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {

  public commands = [];
  public currentCommand;

  constructor() { }

  ngOnInit() {
  }

  public enterCommand(_string) {
    this.commands.push("> " + _string.toUpperCase());

    setTimeout(() => {
      var elem = document.getElementById('flight-console');
      elem.scrollTop = elem.scrollHeight;
    }, 0);

    this.commands.push(this.handleCommand(_string.toUpperCase()));

    this.currentCommand = null;
  }

  private handleCommand(_input) {
    switch(_input) {
      case "ARM":
        return "Arming sucessful";
      default: 
        return "UNKNOWN COMMAND - Are you sure you typed correctly?";
    }
  }

}
