import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneSelectorComponent } from './drone-selector.component';

describe('DroneSelectorComponent', () => {
  let component: DroneSelectorComponent;
  let fixture: ComponentFixture<DroneSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
