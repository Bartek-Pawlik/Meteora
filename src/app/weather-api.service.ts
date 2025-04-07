import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private httpClient : HttpClient) { }

  // function gets weather data for the city a user enters
  getWeatherDataByCity(lat: number, lon : number): Observable<any> {
    return this.httpClient.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=581fd81ff5d1d33bb28ecb1145a5733a&units=metric`);
  }

  getCityNameFromCoords(lat: number, lon: number): Observable<any> {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=581fd81ff5d1d33bb28ecb1145a5733a`;
    return this.httpClient.get(url);
  }
  
  getCoordsFromCityName(cityName: string): Observable<any> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=581fd81ff5d1d33bb28ecb1145a5733a`;
    return this.httpClient.get(url);
  }
}




