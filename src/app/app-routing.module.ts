import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainWeatherComponent } from './components/main-weather/main-weather.component';

const routes: Routes = [
  { path: '', component: MainWeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
