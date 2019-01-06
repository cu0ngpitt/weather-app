import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutelyForecastComponent } from './minutely-forecast.component';

describe('MinutelyForecastComponent', () => {
  let component: MinutelyForecastComponent;
  let fixture: ComponentFixture<MinutelyForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutelyForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutelyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
