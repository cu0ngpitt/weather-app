import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {
  @Input() hourly;

  constructor(public weather: WeatherService) {
  }

  ngOnInit() {
    console.log(this.hourly);
    this.convertUnixTime();
    this.hourly.wind.deg = this.degreesToCardinal(this.hourly.wind.deg);
    this.metersPerSecToKmPerHour();
  }

  convertUnixTime() {
    this.hourly.dt = this.hourly.dt * 1000;
  }

  degreesToCardinal(x) {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    let num = Math.round((x/22.5));

    return degrees[(num % 16)];
  }

  metersPerSecToKmPerHour() {
    if(this.weather.units) {
      return this.hourly.wind.speed = this.hourly.wind.speed / 1000 * 3600;
    }
  }

}
