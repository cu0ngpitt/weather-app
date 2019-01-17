import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyPerDayComponent } from './hourly-per-day.component';

describe('HourlyPerDayComponent', () => {
  let component: HourlyPerDayComponent;
  let fixture: ComponentFixture<HourlyPerDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyPerDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
