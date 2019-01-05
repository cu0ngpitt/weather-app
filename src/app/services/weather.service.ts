import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public units: boolean;

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';   // URL to openweathermap.org weather api
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?';   // URL to openweathermap.org forecast api
  private apiKey = 'INSERT API KEY';                         // openweathermap.org api key


  constructor(private http: HttpClient) {
  }

  getWeather() {
    return this.http.get(this.weatherUrl + this.apiKey + '/' + '32.966904,-96.959011');
  }

  // These are for the openweathermap.org api
  getWeatherMetric() {
    return this.http.get(this.weatherUrl + 'q=Coppell,us&units=metric&APPID=' + this.apiKey);
  }

  getWeatherImperial() {
    return this.http.get(this.weatherUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey);
  }

  getForecastMetric() {
    return this.http.get(this.forecastUrl + 'q=Coppell,us&units=metric&APPID=' + this.apiKey);
  }

  getForecastImperial() {
    return this.http.get(this.forecastUrl + 'q=Coppell,us&units=imperial&APPID=' + this.apiKey);
  }

}
