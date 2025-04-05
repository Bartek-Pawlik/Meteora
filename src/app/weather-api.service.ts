import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private httpClient : HttpClient) { }

  GetWeatherData():Observable<any> {
    return this.httpClient.get("//api.openweathermap.org/data/2.5/weather?q=Galway&APPID=581fd81ff5d1d33bb28ecb1145a5733a&units=metric");
  }

}
