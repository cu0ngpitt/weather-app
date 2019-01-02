import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HighLows } from '../../assets/models/highlows';
import { Days } from '../../assets/models/days';
import { Highs } from '../../assets/models/highs';
import { Lows } from '../../assets/models/lows';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public units: boolean;

  // Current weather parameters
  public city: string;
  public country: string;
  public temp: number;
  public weatherDescription: string;
  public icon: string;
  public humidity: string;
  public wind: number;
  public deg: string;

  // Daily forecast parameters
  public forecastData;      // Unmanipulated data saved from api
  public forecastHiLoData: HighLows[] = [];  // new data manipulated for 5 day Hi/Lo forecast
  public forecastDays: Days[] = [];
  public forecastHighs: Highs[] = [];
  public forecastLows: Lows[] = [];

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';   // URL to openweathermap.org weather api
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?';   // URL to openweathermap.org forecast api
  private apiKey = 'ddb1e0387cda484d86e451353a0828c8';

  constructor(private http: HttpClient) {
  }

  getWeatherMetric() {
    return this.http.get(this.weatherUrl + 'q=Coppell,us&units=metric&APPID=' + this.apiKey)
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
  }

  getWeatherImperial() {
    return this.http.get(this.weatherUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey)
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
  }

  getForecastMetric() {
    return this.http.get(this.forecastUrl + 'q=Coppell,us&units=metric&APPID=' + this.apiKey)
      .subscribe((data: any) => {
        this.forecastData = data.list;
        this.findForecastData();
      });
  }

  getForecastImperial() {
    return this.http.get(this.forecastUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey)
      .subscribe((data: any) => {
        this.forecastData = data.list;
        this.findForecastData();
      });
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

    for(let i=0; i<this.forecastData.length; i++) {
      if(((this.forecastData[i].dt / 21600) - 71585) % 4 != 0) {
        if(highTemp < this.forecastData[i].main.temp) {
          highTemp = this.forecastData[i].main.temp;
        }

        if(lowTemp > this.forecastData[i].main.temp) {
          lowTemp = this.forecastData[i].main.temp;
        }
      } else {
        pushData = {'day': day, 'high': highTemp, 'low': lowTemp};
        this.forecastHiLoData.push(pushData);

        this.forecastHighs.push(highTemp);
        highTemp = this.forecastData[i].main.temp;

        this.forecastLows.push(lowTemp);
        lowTemp = this.forecastData[i].main.temp;

        day = this.forecastData[i].dt * 1000;
        this.forecastDays.push(day);
      }

      if(((this.forecastData[i].dt / 21600) - 71585) % 4 != 0 && i == this.forecastData.length - 1) {
        this.forecastHighs.push(highTemp);
        this.forecastLows.push(lowTemp);

        pushData = {'day': day, 'high': highTemp, 'low': lowTemp};
        this.forecastHiLoData.push(pushData);
      }

    }
  }

}
