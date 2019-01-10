import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public units: boolean;

  private weatherUrl = 'http://localhost:3000/weather/data';

  constructor(private http: HttpClient) {
  }

  getWeather() {
    return this.http.get(this.weatherUrl);
  }

}
