import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { HighLows } from '../../../assets/models/highlows';


@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.scss']
})
export class MainWeatherComponent implements OnInit {
  // units: boolean;

  today: number = Date.now();

  // Current weather parameters
  city: string;
  country: string;
  temp: number;
  weatherDescription: string;
  icon: string;
  humidity: string;
  wind: number;
  deg: string;

  // Daily forecast parameters
  forecastData: any;                  // Unmanipulated data saved from api
  forecastHiLoData: HighLows[] = [];  // new data manipulated for 5 day Hi/Lo forecast
  // forecastHighs = [];      // for testing
  // forecastLows = [];       // for testing
  // forecastDays = [];       // for testing

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weather.units = !this.weather.units;

    this.weather.getWeather()
      .subscribe((data: any) => {
        this.forecastData = data;
        console.log(this.forecastData);
      });

    // these are for the openweathermap.org api
    if(this.weather.units) {
      this.weather.getWeatherMetric()
        .subscribe((data: any) => {
          this.temp = data.main.temp;
          this.city = data.name;
          this.country = data.sys.country;
          this.weatherDescription = data.weather[0].description;
          this.humidity = data.main.humidity;
          this.wind = data.wind.speed / 1000 * 3600;                                        // meter/sec converted to km/hr
          this.deg = this.degreesToCardinal(data.wind.deg);                                 // degrees converted to cardinal direction
          this.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';   // weather icon
          // console.log(data);
          // console.log("degrees are " + data.wind.deg);
        });
      this.weather.getForecastMetric()
        .subscribe((data: any) => {
          this.forecastData = data.list;
          this.findForecastData();
        });
    }

    if(!this.weather.units) {
      this.weather.getWeatherImperial()
        .subscribe((data: any) => {
          this.temp = data.main.temp;
          this.city = data.name;
          this.country = data.sys.country;
          this.weatherDescription = data.weather[0].description;
          this.humidity = data.main.humidity;
          this.wind = data.wind.speed;
          this.deg = this.degreesToCardinal(data.wind.deg);                                 // degrees converted to cardinal direction
          this.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';   // weather icon
          // console.log(data);
          // console.log("degrees are " + data.wind.deg);
        });
      this.weather.getForecastImperial()
        .subscribe((data: any) => {
          this.forecastData = data.list;
          this.findForecastData();
        });
    }
  }

  degreesToCardinal(x) {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    let num = Math.round((x/22.5));

    return degrees[(num % 16)];
  }

  findForecastData() {
    let lowTemp = this.forecastData[0].main.temp,
        highTemp = this.forecastData[0].main.temp,
        day = this.forecastData[0].dt * 1000,
        pushData;

    this.forecastHiLoData = [];

    for(let i=0; i<this.forecastData.length; i++) {
      if(((this.forecastData[i].dt / 21600) - 71585) % 4 != 0) {
        if(highTemp < this.forecastData[i].main.temp) {
          highTemp = this.forecastData[i].main.temp;
        }

        if(lowTemp > this.forecastData[i].main.temp) {
          lowTemp = this.forecastData[i].main.temp;
        }
      } else if(i > 0) {
        pushData = {'day': day, 'high': highTemp, 'low': lowTemp};
        this.forecastHiLoData.push(pushData);
        //
        // this.forecastHighs.push(highTemp);    //for testing
        highTemp = this.forecastData[i].main.temp;

        // this.forecastLows.push(lowTemp);     //for testing
        lowTemp = this.forecastData[i].main.temp;

        day = this.forecastData[i].dt * 1000;
        // this.forecastDays.push(day);      //for testing
      }

      if(((this.forecastData[i].dt / 21600) - 71585) % 4 != 0 && i == this.forecastData.length - 1) {
        // this.forecastHighs.push(highTemp);     //for testing
        // this.forecastLows.push(lowTemp);       //for testing

        pushData = {'day': day, 'high': highTemp, 'low': lowTemp};
        this.forecastHiLoData.push(pushData);
      }

    }
    // console.log(this.forecastData);
    // console.log(this.forecastHighs);
    // console.log(this.forecastLows);
    // console.log(this.forecastHiLoData);
  }

}
