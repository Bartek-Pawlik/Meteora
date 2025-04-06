import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { WeatherAPIService } from './weather-api.service';
import { OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonCardSubtitle, IonCard, IonHeader, IonApp, IonRouterOutlet, CommonModule, IonicModule, FormsModule, HttpClientModule],
  providers: [WeatherAPIService],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private weatherAPI : WeatherAPIService) {}
  kelvin : number = 273.15;
  City: any = "";
  Temperature: number = 0;
  WindSpeed: number = 0;
  Description: any = [];
  CityInput: string = "";
     
  ngOnInit(): void {
    this.getWeatherForCity('Galway'); //default city
  }

  //function to get the weather data for a city
  getWeatherForCity(cityS: string): void {
    this.weatherAPI.getWeatherDataByCity(cityS).subscribe((weatherData) => {
      console.log(weatherData);
      this.City = weatherData.name;
      this.Temperature = weatherData.main.temp;
      this.WindSpeed = Math.round(weatherData.wind.speed * 3.6);
      this.Description = weatherData.weather;
    });
  }

  //function to get the weather data for the city searched
  searchCity(): void {
    if (this.CityInput.trim()) {
      this.getWeatherForCity(this.CityInput.trim());
    }
  }
  }

  

