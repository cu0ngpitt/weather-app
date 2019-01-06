import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HighLows } from '../../assets/models/highlows';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public units: boolean;

  private metricWeatherUrl = 'http://localhost:3000/weather/metric';
  private imperialWeatherUrl = 'http://localhost:3000/weather/imperial';


  constructor(private http: HttpClient) {
  }

  getWeatherMetric() {
    return this.http.get(this.weatherUrl);
  }

  // getWeatherImperial() {
  //   return this.http.get(this.weatherUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey);
  // }
  //
  // getForecastMetric() {
  //   return this.http.get(this.forecastUrl + 'q=Coppell,us&units=metric&APPID=' + this.apiKey)
  //     .subscribe((data: any) => {
  //       this.forecastData = data.list;
  //       this.findForecastData();
  //     });
  // }
  //
  // getForecastImperial() {
  //   return this.http.get(this.forecastUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey)
  //     .subscribe((data: any) => {
  //       this.forecastData = data.list;
  //       this.findForecastData();
  //     });
  // }



}
