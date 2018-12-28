import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.scss']
})
export class MainWeatherComponent implements OnInit {

  city: string;
  country: string;
  today: number = Date.now();
  temp: number;
  weatherDescription: string;
  icon;
  humidity: string;
  wind: number;
  deg: string;

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weather.getWeather()
      .subscribe((data: any) => {
        this.temp = data.main.temp;
        this.city = data.name;
        this.country = data.sys.country;
        this.weatherDescription = data.weather[0].main;
        this.humidity = data.main.humidity;
        this.wind = data.wind.speed / 1000 * 3600;                                        // meter/sec converted to km/hr
        this.deg = this.degreesToCardinal(data.wind.deg);
        this.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';   // weather icon
        console.log(data);
        console.log("degrees are " + data.wind.deg);
      });
  }

  degreesToCardinal(x) {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    let num = Math.round((x/22.5));

    return degrees[(num % 16)];
  }

}
