import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private httpClient : HttpClient) { }

  // function gets weather data for the city a user enters
  getWeatherDataByCity(city: string): Observable<any> {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=581fd81ff5d1d33bb28ecb1145a5733a&units=metric`);
  }
}


