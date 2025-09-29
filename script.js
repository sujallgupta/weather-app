// API Server details with API key and host (Rapid Api)
const url = 'https://weather-api138.p.rapidapi.com/weather?';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '07d36dc2famshca49852d6058b64p1e66b0jsn0d8ae0c02f3c',
    'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
  }
}
// DOM Elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Function to fetch weather data
async function getWeather(city) {
  try {
    // Api request with city name
    const response = await fetch(url + "city_name=" + city, options);
  //  If City Not found
    if(response.status ==404){
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }else{
      // Converts  response to json
const result = await response.json();
    console.log(result);

    // Extract Weather Data
    const kelvin = result.main.temp;
    const celsius = kelvin - 273.15;
    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
    const windSpeed = result.wind.speed;
    const windKmh = (windSpeed * 3.6).toFixed(1);
    const windDeg = result.wind.deg;
    const weatherIcon=document.querySelector(".weather-icon")

    // Converts degrees to compass direction
    function degToCompass(deg) {
      const directions = ["N","NE","E","SE","S","SW","W","NW"];
      return directions[Math.round(deg / 45) % 8];
    }
    const windDir = degToCompass(windDeg);

    // Shows the temperature and wind in console
    console.log(`Temperature in Kelvin: ${kelvin.toFixed(2)} K`);
    console.log(`Temperature in Celsius: ${celsius.toFixed(0)} °C`);
    console.log(`Temperature in Fahrenheit: ${fahrenheit.toFixed(2)} °F`);
    console.log(`Wind: ${windKmh} km/h (${windDir})`);

    // Updates DOM with weather info
    document.querySelector(".city").innerHTML = result.name;
    document.querySelector(".temp").innerHTML = `${celsius.toFixed(0)} °C`;
    document.querySelector(".humidity").innerHTML = result.main.humidity + "%";
    document.querySelector(".wind").innerHTML = `${windKmh} km/h ${windDir}`;

// Weather Images
  if (result.weather[0].main==="Clouds" ){
weatherIcon.src="images/clouds.png";
console.log("Weather : Cloudy");
  }
  else if(result.weather[0].main ==="Clear" ){
weatherIcon.src="images/clear.png";
console.log("Weather : Clear");
  }
  else if(result.weather[0].main ==="Rain" ){
weatherIcon.src="images/rain.png";
console.log("Weather : Rainy");
}
  else if(result.weather[0].main ==="Drizzle" ){
weatherIcon.src="images/drizzle.png";
console.log("Weather : Drizzle");
}
  else if(result.weather[0].main ==="Mist" ){
weatherIcon.src="images/mist.png";
console.log("Weather : Mist");
}
else if(result.weather[0].main ==="Snow" ){
weatherIcon.src="images/snow.png";
console.log("Weather : Snow");
}
// Show weather section and hide erroe
document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";
    }
    
  } catch (error) {
    // Log any error in console
    console.error(error);  
  }
}

// Event Listner for search button
searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
