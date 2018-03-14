import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, HttpReqsService, GlobalService, HttpDefined, JwtTokenHeader, JwtTokenPayload } from '../../../framework/framework-export-barrel';

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent implements OnInit {

  @Output() saveClicked = new EventEmitter();

  public auth = false;
  public username = '';
  public correctCount = 0;
  public incorrectCount = 0;

  private userId = -1;

  constructor(private globalService: GlobalService, private httpReqs: HttpReqsService) { }

  ngOnInit() {
    this.auth = this.globalService.isAuth();
    if (this.auth) {
      let tokenPayload: JwtTokenPayload = this.globalService.getToken();
      this.username = tokenPayload.username;
      this.userId = tokenPayload.user_id;
      this.getStatistics();
    }
  }

  public getStatistics() {
    let reqOption: HttpDefined = {
      requestResource: 'http://skjoldtoft.dk/daniel/hab/index.php',
      data: {
        class: "cns_statistics",
        method: "getUserStatistics", user_id: this.userId
      },
      statusCode: [200]
    };
    this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {
      this.correctCount = data['correct_count'];
      this.incorrectCount = data['incorrect_count'];
    });
  }

  public saveStatistics(correct: number, incorrect: number) {
    let reqOption: HttpDefined = {
      requestResource: 'http://skjoldtoft.dk/daniel/hab/index.php',
      data: {
        class: "cns_statistics",
        method: "setUserStatistics", user_id: this.userId, correct_count: correct, incorrect_count: incorrect
      },
      statusCode: [200]
    };
    this.httpReqs.sendPostRequest(reqOption).subscribe((data) => {
      this.getStatistics();
    });
  }

  public saveClickEventEmit() {
    this.saveClicked.emit(true);
  }

  public onLogin() {
    this.auth = this.globalService.isAuth();
    if (this.auth) {
      let tokenPayload: JwtTokenPayload = this.globalService.getToken();
      this.username = tokenPayload.username;
      this.userId = tokenPayload.user_id;
      this.getStatistics();
    }
  }

}
