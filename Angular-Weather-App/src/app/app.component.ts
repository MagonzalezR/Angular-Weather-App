import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    WeatherForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-Weather-App';
}
