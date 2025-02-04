import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../../location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  async getCoordinates(city: string): Promise<Location> {
    const params = {
      q: city,
      format: 'json',
      limit: '1',
    };
    try {
      return lastValueFrom(this.http.get<any[]>(this.apiUrl, { params }).pipe(
        map((response) => {
          console.log("response");
          if (response.length > 0) {
            if (response[0].addresstype != "country") {
              console.log(response);
              return {
                lat: parseFloat(response[0].lat),
                // latB: parseFloat(response[0].boundingbox[1]),
                lon: parseFloat(response[0].lon),
                // lonB: parseFloat(response[0].boundingbox[3]),
                city: response[0].name,
              };
            } else {
              throw new Error('No Country allowed');
            }
          } else {
            throw new Error('City not found');
          }
        })
      )) ?? [];
    }
    catch (error) {
      console.error(error);
      return { lat: 0, lon: 0, city: '' };
    }
  }
}