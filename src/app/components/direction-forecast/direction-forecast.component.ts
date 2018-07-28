import { Component, OnInit } from '@angular/core';
import { DirectionForecastService } from "../../services/direction-forecast.service";
import { DirectionForecast } from '../../models/direction-forecast';

@Component({
  selector: 'app-direction-forecast',
  templateUrl: './direction-forecast.component.html',
  styleUrls: ['./direction-forecast.component.scss']
})
export class DirectionForecastComponent implements OnInit {

  directionForecast: DirectionForecast;
  steps: number = 16;
  gradient: string = "";
  east: number = 0;
  west: number = 0;
  date: Date = new Date();
  time: number;
  probability: number;
  nightmode: boolean = false;

  constructor(private directionForecastService: DirectionForecastService) { }

  ngOnInit() {
    this.getDirectionForecast();
  }

  getDirectionForecast(): void {
    this.directionForecastService.getForecastData()
      .subscribe(forecastData => {
        this.directionForecast = forecastData;
        this.initGradient();
      })
  }

  private getColor(state: number): string {
    const color = {
      1: "#8AA315",
      2: "#45813E",
      3: "#114044",
    };

    var shortstate = ('' + state)[0];
    if (color[shortstate]) {
      return color[shortstate];
    }
  }

  private onSlide() {
    const factor = this.time % this.steps;
    if (factor === 0) {
      return this.renderData(this.directionForecast.periods, this.time / this.steps);
    }
    return this.renderData(this.directionForecast.periods, (this.time - factor) / this.steps, factor)
  }

  private renderData(periods, index: number, offset: number = null) {
    let curDate: Date = null;
    if (index < periods.length) {
      curDate = new Date(periods[index].from);
      if(offset === null) {
        this.date = curDate;
      }	else {
        curDate.setMinutes(curDate.getMinutes() + (offset*30));
        this.date = curDate;
      }
      this.nightmode = (curDate.getHours() > 22 || curDate.getHours() < 6) && true;
      this.probability = periods[index].probability;
      switch(parseInt(periods[index].state)) {
        case 1:
          this.west = 1;
          this.east = 0;
        break;
        case 2:
          this.west = 1;
          this.east = 1;
        break;
        case 3:
          this.west = 0;
          this.east = 1;
        break;
        case 12:
          this.east = offset/this.steps;
        break;
        case 13:
          this.west = 1-(offset/this.steps);
          this.east = offset/this.steps;
        break;
        case 21:
        case 31:
          this.east = 1-(offset/this.steps);
        break;
        case 23:
          this.west = 1-(offset/this.steps);
        break;
        case 32:
          this.west = offset/this.steps;
        break;
        default:
        break;
      }
    }
  }

  private initGradient() {
    const areas: any[] = new Array();
    let lastState = this.directionForecast.periods[0].state;
    let curState = lastState;

    this.directionForecast.periods.forEach((period, key) => {
      curState = period.state;
      areas.push({state: lastState, from: key});

      lastState = curState != lastState && curState;
    });

    let cssStringChrome = "-webkit-linear-gradient(left,";

    areas.forEach(area => {
      const upper = area.from;
      const percentage = 100 * (upper / this.steps);
      const color = this.getColor(area.state);
      if (color) {
        cssStringChrome += `${color} ${percentage}%, `;
      }
    });
    cssStringChrome = cssStringChrome.substring(0, cssStringChrome.length - 2) + ', #8AA315 100%)';
    this.gradient = cssStringChrome;
  }

}
