import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainWeatherComponent } from './components/main-weather/main-weather.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { MinutelyForecastComponent } from './components/minutely-forecast/minutely-forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    MainWeatherComponent,
    DailyForecastComponent,
    HourlyForecastComponent,
    MinutelyForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
