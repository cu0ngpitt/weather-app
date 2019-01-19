import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../../services/weather.service';

import { Hourly } from '../../../models/hourly';

@Component({
  selector: 'app-hourly-per-day',
  templateUrl: './hourly-per-day.component.html',
  styleUrls: ['./hourly-per-day.component.scss']
})
export class HourlyPerDayComponent implements OnInit {

  @Input() day: Hourly[];

  constructor(public weather: WeatherService) { }

  ngOnInit() {
  }

}
