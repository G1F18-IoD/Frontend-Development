import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-answer',
  templateUrl: './choose-answer.component.html',
  styleUrls: ['./choose-answer.component.css']
})
export class ChooseAnswerComponent implements OnInit {

  @Output() answerChoosen = new EventEmitter();

  public address = '';
  public answers = [''];

  public selectedAnswer = '';

  constructor() { }

  ngOnInit() {
    this.selectedAnswer = this.answers[0];
  }

  public update(address: string, answers: Array<string>) {
    this.answers = answers;
    this.address = address;
  }

  public chooseAnswer(answer: string) {
    this.answerChoosen.emit(answer);
  }

}
