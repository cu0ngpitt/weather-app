import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

  public dailyForecast: any;
  // @Input() datas;

  // Daily weather parameters
  // public time: number;
  // public tempHighF: number;
  // public tempHighC: number;
  // public tempLowF: number;
  // public tempLowC: number;
  // public weatherSummary: string;
  // public icon: string;
  // public humidity: number;
  // public precipitation: number;
  // public precipitationType: string;
  // public windMph: number;
  // public windKph: number;
  // public deg: string;

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getDailyForecast();
  }

  getDailyForecast() {
    this.weather.getWeather()
      .subscribe((data: any) => {
        this.dailyForecast = data.daily.data;
        this.convertUnixTime();
        this.convertFtoC();
        this.mphToKph();
        this.degreesToCardinal();
        console.log(this.dailyForecast);
      });
      // This section will be used if not using router outlet
      // this.time = this.convertUnixTime(this.datas.time);
      // this.tempHighF = this.datas.temperatureMax;
      // this.tempLowF = this.datas.temperatureMin;
      // this.tempHighC = this.convertFtoC(this.datas.temperatureMax);
      // this.tempLowC = this.convertFtoC(this.datas.temperatureMin);
      // this.weatherSummary = this.datas.summary;
      // this.windMph = this.datas.windSpeed;
      // this.windKph = this.mphToKph(this.datas.windSpeed);
      // this.deg = this.degreesToCardinal(this.datas.windBearing);
      // this.precipitation = this.datas.precipProbability;
      // this.precipitationType = this.datas.precipType;
      // this.humidity = this.datas.humidity;
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

  // convertUnixTime(x) {
  //   return x * 1000;
  // }
  //
  // convertFtoC(x) {
  //   return (x -32) / 5 * 9;
  // }
  //
  // mphToKph(x) {
  //   return x * 1.609344;
  // }
  //
  // degreesToCardinal(x) {
  //   const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  //   let num = Math.round((x/22.5));
  //
  //   return degrees[(num % 16)];
  // }

}
