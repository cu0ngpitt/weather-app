import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { Hourly } from '../../models/hourly';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {

  summary: string;

  headerDays: Array<number>;
  day1Hourly: Hourly[];
  day2Hourly: Hourly[];
  day3Hourly: Hourly[];

  hourlyForecast: Hourly[];

  constructor(public weather: WeatherService) {
    this.headerDays = [];
    this.day1Hourly = [];
    this.day2Hourly = [];
    this.day3Hourly = [];
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
        this.summary = data.hourly.summary;
        this.hourlyForecast = data.hourly.data;
        this.convertUnixTime();
        this.convertFtoC();
        this.mphToKph();
        this.degreesToCardinal();
        this.dayOfWeek();
      });
  }

  dayOfWeek() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let time = this.hourlyForecast[0].time,
        date = new Date(time),
        currentDayPlaceholder = date.getDay(),
        day = date.getDay(),
        dayToString = weekday[day],
        daysOfForecast = [];

    // Create array of dates for header purposes
    while(this.headerDays.length < 3) {
      this.headerDays.push(time);
      time = time + 86400000;
    }

    // Converts the unix time into a day of the week and pushes it into an array
    while (day < weekday.length && daysOfForecast.length < 3) {
      dayToString = weekday[day]; //Why cant we push weekday[day] straight into the
      daysOfForecast.push(dayToString);
      day++;
    }

    if (day = weekday.length) {
      day = 0;
      while(day < currentDayPlaceholder && daysOfForecast.length < 3) {
        dayToString = weekday[day];
        daysOfForecast.push(dayToString);
        day++;
      }
    }

    // Separate the forecast array by days
    for(let i=0; i < this.hourlyForecast.length; i++) {
      let time = this.hourlyForecast[i].time, //This will fail a prod build. Two instances of these variables in a scope.
          date = new Date(time),
          day = date.getDay(),
          dayToString = weekday[day];

      if(daysOfForecast[0] == dayToString) {
        this.day1Hourly.push(this.hourlyForecast[i]);
      }

      if(daysOfForecast[1] == dayToString) {
        this.day2Hourly.push(this.hourlyForecast[i]);
      }

      if(daysOfForecast[2] == dayToString) {
        this.day3Hourly.push(this.hourlyForecast[i]);
      }
    }
  }

  convertUnixTime() {
    for(let i=0; i < this.hourlyForecast.length; i++) {
      this.hourlyForecast[i].time = this.hourlyForecast[i].time * 1000;
    }
  }

  convertFtoC() {
    for(let i=0; i < this.hourlyForecast.length; i++) {
      this.hourlyForecast[i].tempC = (this.hourlyForecast[i].temperature - 32) * 5 / 9;
    }
  }

  mphToKph() {
    for(let i=0; i < this.hourlyForecast.length; i++) {
      this.hourlyForecast[i].windKph = this.hourlyForecast[i].windSpeed * 1.609344;
    }
  }

  degreesToCardinal() {
    const degrees = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

    for(let i=0; i < this.hourlyForecast.length; i++) {
      let bearing = this.hourlyForecast[i].windBearing,
          newBearing = Math.round((bearing / 22.5));

      this.hourlyForecast[i].cardinal = degrees[(newBearing % 16)];
    }
  }

}
