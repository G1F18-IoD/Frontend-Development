import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-box',
  templateUrl: './feedback-box.component.html',
  styleUrls: ['./feedback-box.component.scss']
})
/*
* The FeedbackBoxComponent can be used to display either an error or ok message to the user.
* 
* The component takes two inputs: "messageToUser" and "typeName", where the former is optional.
*
* By default, the box will display nothing. This changes if the component receives an input other than null
* in "messageToUser". The component will then display said message. 
*
* "typeName" decides whether the box is styled as an error or as an ok message. 
*
* If no valid type name is given, the component will display an error.
*/
export class FeedbackBoxComponent implements OnInit {
  @Input() messageToUser: string = null;
  @Input() typeName: string;

  constructor() { }

  ngOnInit() {
  }

}
