import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { Daily } from '../../models/daily';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

  summary: string;
  dailyForecast: Daily[];

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getGeo();
  }

  getGeo() {
    this.weather.getGeo()
      .subscribe((data: any) => {
        this.getWeather(data.latitude, data.longitude);
      });
  }

  getWeather(lat, long) {
    let location = { latitude: lat, longitude: long };

    this.weather.getWeather(location)
      .subscribe((data: any) => {
        this.summary = data.daily.summary;
        this.dailyForecast = data.daily.data;
        this.convertUnixTime();
        this.convertFtoC();
        this.mphToKph();
        this.degreesToCardinal();
      });
  }

  convertUnixTime() {
    for(let i=0; i < this.dailyForecast.length; i++) {
      this.dailyForecast[i].time = this.dailyForecast[i].time * 1000;
    }
  }

  convertFtoC() {
    for(let i=0; i < this.dailyForecast.length; i++) {
      this.dailyForecast[i].tempMaxC = (this.dailyForecast[i].temperatureMax - 32) * 5 / 9;
      this.dailyForecast[i].tempMinC = (this.dailyForecast[i].temperatureMin - 32) * 5 / 9;
    }
  }

  mphToKph() {
    for(let i=0; i < this.dailyForecast.length; i++) {
      this.dailyForecast[i].windKph = this.dailyForecast[i].windSpeed * 1.609344;
    }
  }

  degreesToCardinal() {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

    for(let i=0; i < this.dailyForecast.length; i++) {
      let bearing = this.dailyForecast[i].windBearing,
          newBearing = Math.round((bearing / 22.5));

      this.dailyForecast[i].cardinal = degrees[(newBearing % 16)];
    }
  }

}
