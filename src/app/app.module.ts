import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { HourlyPerDayComponent } from './components/hourly-forecast/hourly-per-day/hourly-per-day.component';
import { MainWeatherComponent } from './components/main-weather/main-weather.component';
import { MinutelyForecastComponent } from './components/minutely-forecast/minutely-forecast.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    DailyForecastComponent,
    HourlyForecastComponent,
    HourlyPerDayComponent
    MainWeatherComponent,
    MinutelyForecastComponent,
    NavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
