import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonFunctionsService } from '../../../framework/services/common-functions.service';
import { InputListComponent } from '../../components/input-list/input-list.component';
import { ChooseAnswerComponent } from '../../components/choose-answer/choose-answer.component';
import { UserStatisticComponent } from '../../components/user-statistic/user-statistic.component';

@Component({
  selector: 'app-guess-state-practice',
  templateUrl: './guess-state-practice.component.html',
  styleUrls: ['./guess-state-practice.component.css']
})
export class GuessStatePracticeComponent implements OnInit {
  public addresses = [];
  public answers = [];
  public currentQuestion;
  public lastQuestion = null;
  public correctAnsweredQuestions = [];
  public incorrectAnsweredQuestions = [];

  @ViewChild(InputListComponent)
  public inputListComponent: InputListComponent;
  @ViewChild(ChooseAnswerComponent)
  public chooseAnswerComponent: ChooseAnswerComponent;
  @ViewChild(UserStatisticComponent)
  public userStatisticComponent: UserStatisticComponent;


  constructor(private commonFunctions: CommonFunctionsService) { }

  ngOnInit() {
    this.updateInput();
  }

  public updateInput() {
    this.answers = this.inputListComponent.getPossibleAnswers();
    this.addresses = this.inputListComponent.getAddresses();
    this.commonFunctions.shuffleArray(this.addresses);
    this.correctAnsweredQuestions = [];
    this.incorrectAnsweredQuestions = [];
    this.lastQuestion = null;
    this.currentQuestion = null;
    this.nextAnswer();
    this.updateOutput();
  }

  public updateOutput() {
    if(this.currentQuestion != null) {
      this.chooseAnswerComponent.update(this.currentQuestion['address'], this.answers);
      return;
    }
    this.chooseAnswerComponent.update('-', this.answers);
  }

  public chooseAnswer(answerChoosen) {
    this.lastQuestion = this.currentQuestion;
    if (answerChoosen == this.currentQuestion['answer']) {
      this.correctAnsweredQuestions.push(this.currentQuestion);
      this.lastQuestion.status = 'Correct';
    } else {
      this.incorrectAnsweredQuestions.push(this.currentQuestion);
      this.lastQuestion.status = 'Incorrect';
    }
    this.nextAnswer();
    this.updateOutput();
  }

  private nextAnswer() {
    if(this.addresses.length == 0) {
      this.currentQuestion = null;
      return;
    }
    this.currentQuestion = this.addresses.pop();
  }

  public skipAnswer() {
    this.lastQuestion = this.currentQuestion;
    this.nextAnswer();
    this.updateOutput();
    this.addresses.push(this.lastQuestion);
    this.commonFunctions.shuffleArray(this.addresses);
  }

  public saveStatistics() {
    this.userStatisticComponent.saveStatistics(this.correctAnsweredQuestions.length, this.incorrectAnsweredQuestions.length);
  }

}
