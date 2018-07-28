import { TestBed, inject } from '@angular/core/testing';

import { DirectionForecastService } from './direction-forecast.service';

describe('DirectionForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectionForecastService]
    });
  });

  it('should be created', inject([DirectionForecastService], (service: DirectionForecastService) => {
    expect(service).toBeTruthy();
  }));
});
