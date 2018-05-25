import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPlansComponent } from './flight-plans.component';

describe('FlightPlansComponent', () => {
  let component: FlightPlansComponent;
  let fixture: ComponentFixture<FlightPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
