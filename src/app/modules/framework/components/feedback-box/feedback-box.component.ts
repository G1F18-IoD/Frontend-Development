import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-box',
  templateUrl: './feedback-box.component.html',
  styleUrls: ['./feedback-box.component.scss']
})
export class FeedbackBoxComponent implements OnInit {
  @Input() messageToUser: string = null;
  @Input() typeName: string;

  constructor() { }

  ngOnInit() {
  }

}
