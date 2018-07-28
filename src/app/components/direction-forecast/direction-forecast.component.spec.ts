import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionForecastComponent } from './direction-forecast.component';

describe('DirectionForecastComponent', () => {
  let component: DirectionForecastComponent;
  let fixture: ComponentFixture<DirectionForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
