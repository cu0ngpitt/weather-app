import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Currently } from '../models/currently';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public units: string;

  // Geolocation
  public city: string;
  public state: string;

  // Weather parameters
  public dailyForecast: any;
  public hourlyForecast: any;
  public minutelyForecast: any;

  private weatherUrl = 'http://localhost:3000/weather/data';
  private geoLocationUrl = 'http://localhost:3000/weather/geo';

  constructor(private http: HttpClient) {
  }

  getGeo() {
    return this.http.get(this.geoLocationUrl)
      .pipe(
        map((data: any) => {
          this.city = data.city;
          this.state = data.region_code;

          return data;
        })
      );
  }

  getWeather(location) {
    return this.http.post(this.weatherUrl, location, httpOptions)
      .pipe(
        map((data: any) => {
          this.dailyForecast = data.daily;
          this.hourlyForecast = data.hourly;
          this.minutelyForecast = data.minutely;

          return data.currently;
        })
      );
  }

}
