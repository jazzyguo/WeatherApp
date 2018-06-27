import * as types from './actionTypes';
import axios from 'axios';

const CURRENT_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
const apiKey = '&APPID=20dfab14fef55808617b787eaf7473a9';

/* confirms retreival of weather data
 */
export function receiveWeather(data) {
  return {
    type: types.RECEIVE_WEATHER, 
    payload: data.data
  };
}

/* fetches current weather on city ID
 */
export function getCurrrentWeather(cityID){
  let url;

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
