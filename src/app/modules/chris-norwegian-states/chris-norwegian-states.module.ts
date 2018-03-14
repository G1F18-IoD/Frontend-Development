import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrameworkModule } from '../framework/framework.module';
import { InputListComponent } from './components/input-list/input-list.component';
import { ChooseAnswerComponent } from './components/choose-answer/choose-answer.component';
import { GuessStatePracticeComponent } from './viewes/guess-state-practice/guess-state-practice.component';
import { UserStatisticComponent } from './components/user-statistic/user-statistic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FrameworkModule
  ],
  declarations: [InputListComponent, ChooseAnswerComponent, GuessStatePracticeComponent, UserStatisticComponent],
  exports: [
    GuessStatePracticeComponent
  ]
})
export class ChrisNorwegianStatesModule { }
