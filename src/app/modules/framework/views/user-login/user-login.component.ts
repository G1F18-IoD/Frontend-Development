import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public loggedInEvent() {
    this.loggedIn.emit(true);
  }

}
