import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { Minutely } from '../../models/minutely';

@Component({
  selector: 'app-minutely-forecast',
  templateUrl: './minutely-forecast.component.html',
  styleUrls: ['./minutely-forecast.component.scss']
})
export class MinutelyForecastComponent implements OnInit {

  summary: string;
  minutelyForecast: Minutely[];

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getGeo();
  }

  getGeo() {
    this.weather.getGeo()
      .subscribe((data: any) => {
        this.getWeather(data.latitude, data.longitude);
        //Reference main-weather.component.ts comment on obserables
      });
  }

  getWeather(lat, long) {
    let location = { latitude: lat, longitude: long };

    this.weather.getWeather(location)
      .subscribe((data: any) => {
        this.summary = data.minutely.summary;
        this.minutelyForecast = data.minutely.data;
        this.convertUnixTime();
      });
  }

  convertUnixTime() {
    for(let i=0; i < this.minutelyForecast.length; i++) {
      this.minutelyForecast[i].time = this.minutelyForecast[i].time * 1000;
    }
  }

}
