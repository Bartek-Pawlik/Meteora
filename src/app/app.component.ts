import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { WeatherAPIService } from './weather-api.service';
import { OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonCardSubtitle, IonCard, IonHeader, IonApp, IonRouterOutlet, CommonModule, IonicModule, FormsModule, HttpClientModule],
  providers: [WeatherAPIService],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private weatherAPI : WeatherAPIService, private storage: Storage) {}
  //variables for weather info
  kelvin : number = 273.15;
  City: any = "";
  Temperature: number = 0;
  WindSpeed: any = [];
  Description: any = "";
  Condition: any = [];
  CityInput: string = "";
  hourlyForecast: any = [];
  feelsLike: any = "";

  detailedForecast = {
    sunrise: '',
    sunset: '',
    windSpeed: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
    ceiling: '',
    uv: 0,
  };

  favoriteCities: any = [];

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
    this.storage.create();
    this.getGPS();
    this.loadFavoriteCities();
  }

  //function to save favorite cities to storage
  async saveFavoriteCities() {
    await this.storage.set('favoriteCities', this.favoriteCities);
  }

  //function to load cities
  async loadFavoriteCities() {
    const cities = await this.storage.get('favoriteCities');
    if (cities) {
      this.favoriteCities = cities;
    }
  }

  //function to add city to favorites list
  addCityToFavorites(): void {
    if (!this.favoriteCities.includes(this.City)) { //check if already favourited
      this.favoriteCities.push(this.City);
      this.saveFavoriteCities();
    }
  }
  
  //function to get coords and weather for favourited city name
  selectCity(city: string): void {
    this.weatherAPI.getCoordsFromCityName(city).subscribe((locationData) => {
      if (locationData && locationData.length > 0) {
        const lat = locationData[0].lat;
        const lon = locationData[0].lon;
    
        this.City = locationData[0].name;
        this.getWeatherForCity(lat, lon);
      }
    });
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
  
        this.City = locationData[0].name;
        this.getWeatherForCity(lat, lon);
      } 
    });
  }

  //function to format time for sunrise and sunset
  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //show as 2 digits
  }


  //function to get the weather data for a city using coords
  getWeatherForCity(lat: number, lon: number): void {
    this.weatherAPI.getWeatherDataByCity(lat, lon).subscribe((weatherData) => {
      console.log(weatherData);
  
      this.Description = weatherData.current.weather[0].description.charAt(0).toUpperCase() +
                         weatherData.current.weather[0].description.slice(1);
      this.WindSpeed = weatherData.current.wind_speed;
      this.Temperature = Math.round(weatherData.current.temp);
      this.feelsLike = Math.round(weatherData.current.feels_like);
  
      this.detailedForecast = {
        sunrise: this.formatTime(weatherData.current.sunrise),
        sunset: this.formatTime(weatherData.current.sunset),
        windSpeed: weatherData.current.wind_speed,
        pressure: weatherData.current.pressure,
        humidity: weatherData.current.humidity,
        visibility: weatherData.current.visibility / 1000, // convert to km
        ceiling: weatherData.current.clouds,
        uv: weatherData.current.uvi,
      };

      // get first 8 hours of forecast
      this.hourlyForecast = weatherData.hourly.slice(0, 8).map((h: any) => { 
        const date = new Date(h.dt * 1000);
        const hour = date.getHours();
        const time = `${hour % 12 || 12}${hour >= 12 ? 'pm' : 'am'}`; //assign am and pm
  
        //return data for each hour
        return {
          time: time,
          temp: Math.round(h.temp),
          feels: Math.round(h.feels_like),
          icon: h.weather[0].icon,
          rain: h.pop ? Math.round(h.pop * 100) : 0 //chance of rain
        };
      });
    });
  }
  
  //gets icon for hourly weather condition
  getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}

  

