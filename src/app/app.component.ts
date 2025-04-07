import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { WeatherAPIService } from './weather-api.service';
import { OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonCardSubtitle, IonCard, IonHeader, IonApp, IonRouterOutlet, CommonModule, IonicModule, FormsModule, HttpClientModule],
  providers: [WeatherAPIService],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private weatherAPI : WeatherAPIService) {}
  //variables for weather info
  kelvin : number = 273.15;
  City: any = "";
  Temperature: number = 0;
  WindSpeed: any = [];
  Description: any = "";
  Condition: any = [];
  CityInput: string = "";

  //variables for geolocation plugin
  lat: number = 0;
  lon: number = 0;
  coordinates : any = "";
  
  //gets user location with geolocation plugin
  async getGPS() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.lat = this.coordinates.coords.latitude;
    this.lon = this.coordinates.coords.longitude;

    //get weather and city name
    this.getWeatherForCity(this.lat, this.lon); 
    this.getCityName(this.lat, this.lon);
  }

  ngOnInit(): void {
    this.getGPS();
  }

  //reverse geocoding api from openWeather to get city name from coords
  getCityName(lat: number, lon: number): void {
    this.weatherAPI.getCityNameFromCoords(lat, lon).subscribe((locationData) => {
      if (locationData && locationData.length > 0) {
        this.City = locationData[0].name;
      }
    });
  }

  //function to search for entered city name
  searchCityWeather() {
    this.weatherAPI.getCoordsFromCityName(this.CityInput).subscribe((locationData) => {
      if (locationData && locationData.length > 0) {
        const lat = locationData[0].lat;
        const lon = locationData[0].lon;
  
        this.lat = lat;
        this.lon = lon;
        this.City = locationData[0].name;
  
        //get weather for city searched
        this.getWeatherForCity(lat, lon);
      } 
      else {
        console.log('City not found');
      }
    });
  }

  //function to get the weather data for a city
  getWeatherForCity(lat : number, lon : number): void {
    this.weatherAPI.getWeatherDataByCity(lat, lon).subscribe((weatherData) => {
      console.log(weatherData);
      
      //capitalise first letter
      const desc = weatherData.current.weather[0].description;
      this.Description = desc.charAt(0).toUpperCase() + desc.slice(1);

      this.WindSpeed = weatherData.current.wind_speed;
      this.Temperature = weatherData.current.temp;

      
    });
  }

  }

  

