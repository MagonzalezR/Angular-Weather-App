import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/Weather/weather.service';
import { Weather } from '../weather';
import { LocationService } from '../services/Location/location.service';
import { Location } from '../location';

@Component({
  selector: 'app-weather-forecast',
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})

export class WeatherForecastComponent implements OnInit{

  weather: Weather = {
    id: 0,
    city: 'asda',
    date: new Date(),
    maxTemp: 0,
    minTemp: 0,
    condition: '',
    icon: ''
  }

  city: string = '';
  forecasts: any[] = [];
  error: string = '';
  cityBounddingBox: Location = {
    lat: 0,
    // latB: 0,
    lon: 0,
    // lonB: 0
    city: '',
  };

  constructor(private weatherService: WeatherService, private locationService: LocationService) {}

  ngOnInit() {}

  async searchWeather() {
    if (!this.city.trim()) {
      this.error = 'Por favor ingrese una ciudad';
      return;
    }

    this.error = '';
    this.cityBounddingBox = await this.locationService.getCoordinates(this.city);

    try {
      const data = await this.weatherService.getCityWeather(this.cityBounddingBox, this.city);
      this.forecasts = data;
    } catch (error) {
      this.error = 'Error al obtener el pronóstico. Por favor intente nuevamente.';
      console.error(error);
    }
  //   this.weatherService.getWeatherForecast(this.city)
  //     .subscribe({
  //       next: (data) => {
  //         this.forecasts = data;
  //       },
  //       error: (error) => {
  //         this.error = 'Error al obtener el pronóstico. Por favor intente nuevamente.';
  //         console.error(error);
  //       }
  //     });
  }
}
