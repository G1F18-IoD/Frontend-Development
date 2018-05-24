import { Component, OnInit } from '@angular/core';
import { HttpDefined } from '../../../../interfaces/http-defined';
import { HttpReqsService } from '../../../../framework-export-barrel';
import { RpiconnectionService } from '../../../../services/rpiconnection.service';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.scss']
})
/*
* The FlightControlComponent provides the primary interface once the user has connected to a drone.
* The view displays a command console, along with controller buttons for the connected drone.
*
* The command console allows the user to enter commands. For example, the user can run flightplans by
* writing "RUN <flightplan name>". This will then create a call to the backend, letting it know that
* the specified flightplan should be run.
*
* The controller buttons allow the user to control the connected drone live.
*/
export class FlightControlComponent implements OnInit {

  public possibleCommands = ["RUN &ltflightplan&gt", "ARM", "HELP"];
  public commands = [];
  public currentCommand;
  public uniqID = new Date();

  constructor(
    private httpReqs: HttpReqsService,
    private rpicon: RpiconnectionService
  ) { }

  ngOnInit() {
    this.possibleCommands.sort();
  }

  /*
  * enterCommand() is used by the command console to process user given commands,
  * in the shape of a string.
  * 
  * The method makes sure that the user sees what command has been given,
  * and what the result of this command is.
  */
  public enterCommand(_string: string) {
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

  /*
  * getStatusColor() takes a string as a parameter. This string should correspond with a
  * specific command line. 
  * 
  * This string is run through a switch and the appropriate color is returned.
  */
  private getStatusColor(_cmd: string) {
    switch (_cmd.toUpperCase()) {
      case "RUNNING":
      case "SUCCESS":
        return "lightgreen";
      case "UNKNOWN":
      case "ERROR":
        return "red";
      default:
        return "white";
    }
  }

  /*
  * handleCommand() takes up to two parameters. The first parameter, _cmd, signifies a command.
  * This command is run through a switch, which picks the correct action.
  * 
  * If the command is not recognized, the returned string will be an error.
  * 
  * The second parameter, _cmd_specification, is used with certain commands.
  * For example, "RUN" requires the name of a flightplan. This is specified with _cmd_specification.
  * This parameter is, however, not required and can therefore be ignored.
  */
  private handleCommand(_cmd: string, _cmd_specification?: string) {
    switch (_cmd.toUpperCase()) {
      case "ARM":
        return "SUCCESS - Arming sucessful";
      case "RUN":
        if (_cmd_specification != null  && _cmd_specification != "") {
          this.executeFlightPlan(_cmd_specification);
          return "RUNNING - Initiating " + _cmd_specification;
        } else {
          return "ERROR - No flightplan defined. Use 'RUN &ltflightplan name&gt'.";
        }
      case "HELP":
        var helpString = "The following commands are available:<br />";
        this.possibleCommands.forEach(command => {
          helpString += "- " + command + "<br />";
        });
        return helpString;
      case "ANDERS":
        return "Is numbah 1!";
      default:
        return "UNKNOWN - Use 'HELP' to get a list of commands.";
    }
  }

  /*
  * executeFlightPlan() takes the name of a flightplan as a parameter.
  * This flightplan is then executed via the rpiconnection service.
  * If the call goes through, "SUCCESS" is posted to the console.
  * If not, an error is posted.
  */
  private executeFlightPlan(_flightplan) { // Priority is hardcoded to 1 until further setup
    this.rpicon.executeFlightplanOnDrone(_flightplan, 1).subscribe((data) => {
      this.commands.push("SUCCESS - " + _flightplan + " now running");
    }, error => {
      this.commands.push("ERROR - " + _flightplan + " ran into an error");
    });
  }

}
