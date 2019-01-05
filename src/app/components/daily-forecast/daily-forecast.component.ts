import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

  @Input() datas;

  constructor(public weather: WeatherService) { }

  ngOnInit() {
  }

}
