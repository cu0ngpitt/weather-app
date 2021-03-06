import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { WeatherService } from '../../services/weather.service';

import { Currently } from '../../models/currently';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.scss']
})
export class MainWeatherComponent implements OnInit {

  currently: Currently;

  constructor(public weather: WeatherService,
              public router: Router) {
    this.weather.units = "imperial";
  }

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
        this.currently = data.currently;
        console.log(data)
        this.currently.time = this.convertUnixTime(data.currently.time);
        // console.log(this.currently.time + ': after conversion')
        this.currently.tempC = this.convertFtoC(data.currently.temperature);
        this.currently.feelsLikeC = this.convertFtoC(data.currently.apparentTemperature);
        this.currently.windKph = this.mphToKph(data.currently.windSpeed);
        this.currently.deg = this.degreesToCardinal(data.currently.windBearing);
        console.log(this.currently)
      });
  }

  convertUnixTime(x) {
    return x * 1000;
  }

  convertFtoC(x) {
    return (x - 32) * 5 / 9;
  }

  mphToKph(x) {
    return x * 1.609344;
  }

  degreesToCardinal(x) {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    let num = Math.round((x/22.5));

    return degrees[(num % 16)];
  }

}
