//create function to fetch information (async as it the creation of dom elements depend on information being recieved)
//process JSON data to return object with applicable data
//console log information.
// create a form were users can search for a location to retrieve weather data.
//create elements in dom displaying appropriate information

const main = document.querySelector('.main');
let weatherObj = {};

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
  } catch (error) {
    console.log(error);
  }
}

// handleData recieves getData's return and assigns properties to the global "weatherObj" default to celcius
function handleData(weatherData) {
  let cityName = weatherData.name;
  let feelsLike = weatherData.main.feels_like;
  let temp = weatherData.main.temp;
  let tempMin = weatherData.main.temp_min;
  let tempMax = weatherData.main.temp_max;
  let description = weatherData.weather[0].description;
  let humidity = weatherData.main.humidity;
  weatherObj.name = cityName;
  weatherObj.description = description;
  weatherObj.humidity = humidity;
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
  console.log(weatherObj);
});


function convertToCel(){
  weatherObj.temp = parseFloat(((weatherObj.temp - 32)/(1.8)).toFixed(1));
  weatherObj.tempMin = parseFloat(((weatherObj.tempMin - 32)/(1.8)).toFixed(1));
  weatherObj.tempMax = parseFloat(((weatherObj.tempMax - 32)/(1.8)).toFixed(1));
  weatherObj.feelsLike = parseFloat(((weatherObj.feelsLike - 32)/(1.8)).toFixed(1));
  console.log(weatherObj)
}

function convertToFar(){
  weatherObj.temp = parseFloat(((weatherObj.temp*1.8)+32).toFixed(1));
  weatherObj.tempMin = parseFloat(((weatherObj.tempMin*1.8)+32).toFixed(1));
  weatherObj.tempMax = parseFloat(((weatherObj.tempMax*1.8)+32).toFixed(1));
  weatherObj.feelsLike = parseFloat(((weatherObj.feelsLike*1.8)+32).toFixed(1));
  console.log(weatherObj)
}
const unamerican = document.getElementById('unamerican')

unamerican.addEventListener('click', () => {
  if(unamerican.checked){
    convertToCel();
  }else if(!unamerican.checked){
    convertToFar();
  }
})