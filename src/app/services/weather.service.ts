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

  // Not a big thing. Maybe break the first part off and reference and then reference with interpolation;
  // E.G
  // private apiLocation = 'http://localhost:3000';
  // private weatherUrl = `${apiLocation}/weather/data`;
  // private geoLocationUrl = `${apiLocation}/weather/geo`;

  // this way if the domain changes you do not need to update it in however many different locations
  // Also look at using an environments file that way you can pass it into the different services and have the same effect

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
    return this.http.post(this.weatherUrl, location, httpOptions);
  }

}
