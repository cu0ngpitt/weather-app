import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.scss']
})
export class MainWeatherComponent implements OnInit {

  today: number = Date.now();

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weather.units = !this.weather.units;

    if(this.weather.units) {
      this.weather.getWeatherMetric();
      this.weather.getForecastMetric();
    }

    if(!this.weather.units) {
      this.weather.getWeatherImperial();
      this.weather.getForecastImperial();
    }
  }

}
