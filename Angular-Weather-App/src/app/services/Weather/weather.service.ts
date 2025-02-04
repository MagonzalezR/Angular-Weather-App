import { Injectable } from '@angular/core';
import { Weather, WeatherResponse } from '../../weather';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Buffer } from 'buffer';
import { Location } from '../../location';
import { WeatherDictionary } from '../Weather.Dic';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private connectionString = 'https://api.meteomatics.com/';
  private username = 'na_gonzalez_miguel';
  private password = '9rmAO1A4hv';

  constructor(private http: HttpClient) { }

  async getCityWeather(boundary: Location, city: string): Promise<Weather[]> {

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00 UTC

    const futureDate = new Date();
    futureDate.setUTCDate(today.getUTCDate() + 3); // Add 3 days
    futureDate.setUTCHours(0, 0, 0, 0);

    const todayFormatted = today.toISOString();
    const futureDateFormatted = futureDate.toISOString();

    const tmax = 't_max_2m_1h:C';
    const tmin = 't_min_2m_1h:C';
    const weather = 'weather_symbol_1h:idx';

    const route = `${todayFormatted}--${futureDateFormatted}:PT1H/${tmax},${tmin},${weather}/${boundary.lat},${boundary.lon}/json`;

    const token = Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64');
    const baseHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + token
    });
    try {
      const data = await lastValueFrom(this.http.get<WeatherResponse>(this.connectionString + route, { headers: baseHeader }));
      console.log(data);
      var weatherData: Weather[];

      weatherData = data.data[0].coordinates[0].dates.map((entry, index) => ({
        city: city,
        date: new Date(entry.date),
        maxTemp: data.data.find(d => d.parameter === tmax)?.coordinates[0].dates[index]?.value || 0,
        minTemp: data.data.find(d => d.parameter === tmin)?.coordinates[0].dates[index]?.value || 0,
        condition: data.data.find(d => d.parameter === weather)?.coordinates[0].dates[index]?.value.toString() || "",
        icon: WeatherDictionary[data.data.find(d => d.parameter === weather)?.coordinates[0].dates[index]?.value || 0],
      }));

      console.log(weatherData);
      return weatherData ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }

  }
}
