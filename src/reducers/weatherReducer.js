import { GET_CURRENT_WEATHER, RECEIVE_WEATHER,
         GET_FORECAST, RECEIVE_FORECAST,
         CHANGE_SCALE } from '../actions/actionTypes';

const initState = {
	currentWeather: {},
  forecast: {},
  loading: true,
  forecastLoading: true,
  celsius: false
};

export default function weatherReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case RECEIVE_WEATHER:
      newState = Object.assign({}, state, {
        currentWeather: action.payload,
        loading: false
      });
      break;

    case RECEIVE_FORECAST:
      newState = Object.assign({}, state, {
        forecast: action.payload,
        forecastLoading: false
      });
      break;

    case GET_CURRENT_WEATHER:
    	newState = Object.assign({}, state, {
        loading: true
      });
    	break;

    case GET_FORECAST:
      newState = Object.assign({}, state, {
        forecastLoading: true
      });
      break;

    case CHANGE_SCALE:
      newState = Object.assign({}, state, {
        celsius: !state.celsius
      });
      break;
    default:
      newState = state;
  }
  return newState;
}

