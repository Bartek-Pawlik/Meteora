Meteora is a weather forecast app built with Ionic and Angular, created to provide simple, easy to read, and up to date weather information for any location.
It allows users to search for cities and view weather information such as temperature, wind speed, and more.

Features: 

- Weather search: Ability to search for any city on the planet, and get instant weather information.
- Hourly forecast: View the next 8 hours of weather.
- Detailed weather information: View additional weather data such as sunrise and sunset times, pressure, and humidity.
- Favouites: Save your favourite cities, for quick and easy access
- PWA support: The app is designed to work as a PWA, allowing offline access and fast performance.

Tech Stack: 
- Frontend: Ionic, Angular
- API: OpenWeatherMap One Call API 3.0, OpenWeatherMap Geocoding API
- Storage: Ionic Storage for saving favourite cities
- Geolocation: Capacitor Geolocation

Usage: 

1. Clone the repository:
    - git clone https://github.com/Bartek-Pawlik/Meteora.git
2. Navigate to project directory
    - cd Meteora
3. Install dependancies:
    - npm install @capacitor/geolocation @ionic/storage-angular
4. Sync with capacitor:
    - npx cap sync
5. Run the app
    - ionic serve
  
      
