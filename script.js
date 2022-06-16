const main = document.querySelector('.main');
let weatherObj = {};
const unamerican = document.getElementById('unamerican');

//requests data from API, passes the response to "handleData"
async function getData(search) {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        search +
        '&APPID=3caaac409d8546eeee69da1e224c5b2b',
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    handleData(weatherData);
    if(unamerican.checked){
      convertToCel()
      unit.textContent = 'Celcius';
    }
    displayData();
    getPhoto(weatherObj.weather);
  } catch (error) {
    alert('Unable to locate your city.')
    console.log(error);
  }
}

// handleData recieves getData's return and assigns properties to the global "weatherObj" default to F
function handleData(weatherData) {
  let feelsLike = weatherData.main.feels_like;
  let temp = weatherData.main.temp;
  let tempMin = weatherData.main.temp_min;
  let tempMax = weatherData.main.temp_max;
  weatherObj.weather = weatherData.weather[0].main;
  weatherObj.name = weatherData.name;
  weatherObj.description = weatherData.weather[0].description;
  weatherObj.humidity = weatherData.main.humidity;
  weatherObj.temp = parseFloat((temp * (9 / 5) - 459.67).toFixed(1));
  weatherObj.tempMin = parseFloat((tempMin * (9 / 5) - 459.67).toFixed(1));
  weatherObj.tempMax = parseFloat((tempMax * (9 / 5) - 459.67).toFixed(1));
  weatherObj.feelsLike = parseFloat((feelsLike * (9 / 5) - 459.67).toFixed(1));
}

// to clear weatherObj when a new search is made
function clearWeatherObj() {
  for (const key in weatherObj) {
    delete weatherObj[key];
  }
}
// on form submission, the original weatherObj is cleared and the value of the searchBox text input is passed as an arguement in getData
const searchForm = document.querySelector('form');
const searchBox = document.getElementById('search');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearWeatherObj();
  let userInput = searchBox.value;
  getData(userInput);
  searchBox.value = ' ';
  console.log(weatherObj);
});

// function for converting from default F to Cel
function convertToCel() {
  weatherObj.temp = parseFloat(((weatherObj.temp - 32) / 1.8).toFixed(1));
  weatherObj.tempMin = parseFloat(((weatherObj.tempMin - 32) / 1.8).toFixed(1));
  weatherObj.tempMax = parseFloat(((weatherObj.tempMax - 32) / 1.8).toFixed(1));
  weatherObj.feelsLike = parseFloat(
    ((weatherObj.feelsLike - 32) / 1.8).toFixed(1)
  );
  console.log(weatherObj);
}

// function for converting Cel to F
function convertToFar() {
  weatherObj.temp = parseFloat((weatherObj.temp * 1.8 + 32).toFixed(1));
  weatherObj.tempMin = parseFloat((weatherObj.tempMin * 1.8 + 32).toFixed(1));
  weatherObj.tempMax = parseFloat((weatherObj.tempMax * 1.8 + 32).toFixed(1));
  weatherObj.feelsLike = parseFloat(
    (weatherObj.feelsLike * 1.8 + 32).toFixed(1)
  );
  console.log(weatherObj);
}

//User toggle for displaying temp in CEL
const unit = document.querySelector('.unit');
unamerican.addEventListener('click', () => {
  if (unamerican.checked) {
    convertToCel();
    displayData();
    unit.textContent = ' ';
    unit.textContent = 'Celcius';
  } else if (!unamerican.checked) {
    convertToFar();
    displayData();
    unit.textContent = ' ';
    unit.textContent = 'Farenheit';
  }
});

// populate elements with information
let cityName = document.querySelector('.name');
let temp = document.querySelector('.temp');
let description = document.querySelector('.description');
let tempHigh = document.querySelector('.tempHigh');
let tempLow = document.querySelector('.tempLow');
let feelsLike = document.querySelector('.feelsLike');
let humidity = document.querySelector('.humidity');

function displayData() {
  cityName.textContent = 'City: ' + weatherObj.name;
  description.textContent = 'Weather: ' + weatherObj.description;
  temp.textContent = 'Temp: ' + weatherObj.temp + '°';
  humidity.textContent = 'Humidity: ' + weatherObj.humidity + '%';
  tempHigh.textContent = 'High: ' + weatherObj.tempMax + '°';
  tempLow.textContent = 'Low: ' + weatherObj.tempMin + '°';
  feelsLike.textContent = 'Feels Like: ' + weatherObj.feelsLike + '°';
}
//get a photo from GIPHY based on weather conditions
const img = document.querySelector('img');
async function getPhoto(weather) {
  try {
    const response = await fetch(
      'https://api.giphy.com/v1/gifs/translate?api_key=kHJnVGKc9YGTpmsw66SpTvInqWQzDjkU&s=' +
        weather,
      { mode: 'cors' }
    );
    const picData = await response.json();
    img.src = picData.data.images.original.url;
  } catch (error) {
   console.log(error)
  }
}

getData('Dallas');
