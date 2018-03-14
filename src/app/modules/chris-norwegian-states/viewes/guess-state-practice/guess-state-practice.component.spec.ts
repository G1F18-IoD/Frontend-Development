import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessStatePracticeComponent } from './guess-state-practice.component';

describe('GuessStatePracticeComponent', () => {
  let component: GuessStatePracticeComponent;
  let fixture: ComponentFixture<GuessStatePracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessStatePracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessStatePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
