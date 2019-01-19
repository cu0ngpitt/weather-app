import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { MainWeatherComponent } from './components/main-weather/main-weather.component';
// import { AppComponent } from './app.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { MinutelyForecastComponent } from './components/minutely-forecast/minutely-forecast.component';

const routes: Routes = [
  // { path: 'current', component: MainWeatherComponent },
  // { path: 'current', component: AppComponent },
  { path: 'daily', component: DailyForecastComponent },
  { path: 'hourly', component: HourlyForecastComponent },
  { path: 'minutely', component: MinutelyForecastComponent },
  // { path: '', redirectTo: '/current', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
