import { Component } from '@angular/core';

import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';

  constructor(public weather: WeatherService) {
  }

  toggleMetric() {
    this.weather.units = "metric";
  }

  toggleImperial() {
    this.weather.units = "imperial";
  }

}
