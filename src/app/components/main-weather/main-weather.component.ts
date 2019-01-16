import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { Currently } from '../../models/currently';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.scss']
})
export class MainWeatherComponent implements OnInit {

  currently: Currently;

  constructor(public weather: WeatherService) {
    this.weather.units = "imperial";
  }

  ngOnInit() {
    this.getGeo();
    console.log(this.weather.units)
  }

  getGeo() {
    this.weather.getGeo()
      .subscribe((data: any) => {
        console.log(data)
        this.getWeather(data.latitude, data.longitude);
      });
  }

  getWeather(lat, long) {
    let location = { latitude: lat, longitude: long };

    this.weather.getWeather(location)
      .subscribe((data: any) => {
        this.currently = data;
        this.currently.time = this.convertUnixTime(data.time);
        this.currently.tempC = this.convertFtoC(data.temperature);
        this.currently.feelsLikeC = this.convertFtoC(data.apparentTemperature);
        this.currently.windKph = this.mphToKph(data.windSpeed);
        this.currently.deg = this.degreesToCardinal(data.windBearing);
        console.log(this.currently);
      });
  }

  convertUnixTime(x) {
    return x * 1000;
  }

  convertFtoC(x) {
    return (x -32) / 5 * 9;
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
