import { RECEIVE_WEATHER, GET_CURRENT_WEATHER } from '../actions/actionTypes';

const initState = {
	currentWeather: {},
  loading: false
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

    case GET_CURRENT_WEATHER:
    	newState = Object.assign({}, state, {
        loading: true
      });
    	break;

    default:
      newState = state;
  }
  return newState;
}

