import * as types from './actionTypes';
import axios from 'axios';

const CURRENT_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
const apiKey = '&APPID=20dfab14fef55808617b787eaf7473a9';

/*********** 
five cities for project specs
************/
const cityIDs = {
  'New York': 5128581, 
  'London': 2643743, 
  'Paris': 4717560, 
  'Singapore': 1880252,
  'San Francisco': 3669859
};

/* confirms retreival of weather data
 */
export function receiveWeather(data) {
  return {
    type: types.RECEIVE_WEATHER, 
    payload: data.data
  };
}

/* fetches current weather on city name
 */
export function getCurrrentWeather(city){
  let url;
  const cityID = cityIDs[city];

  url = `${CURRENT_WEATHER_URL}${apiKey}&id=${cityID}&units=imperial`

  return function action(dispatch) {
    dispatch({ 
        type: types.GET_CURRENT_WEATHER
    })

    const request = axios({
     method: 'GET',
     url: url
    });
    
    return request.then(
      response => dispatch(receiveWeather(response))
    )
  }
}

export function changeCity(index) {

  return {
    type: types.CHANGE_CITY, 
    index
  };
}