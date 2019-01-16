import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
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
  public currentlyForecast$: Observable<Currently>;
  public dailyForecast: any;
  public hourlyForecast: any;
  public minutelyForecast: any;

  private weatherUrl = 'http://localhost:3000/weather/data';
  private geoLocationUrl = 'http://localhost:3000/weather/geo';

  constructor(private http: HttpClient) {
  }

  getGeo(): Observable<any> {
    return this.http.get<any>(this.geoLocationUrl)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getWeather(location): Observable<any> {
    return this.http.post(this.weatherUrl, location, httpOptions)
      .pipe(
        map((data: any) => {
          this.currentlyForecast$ = data.currently;
          this.dailyForecast = data.daily;
          this.hourlyForecast = data.hourly;
          this.minutelyForecast = data.minutely;

          return this.currentlyForecast$;
        })
      );
  }

}
