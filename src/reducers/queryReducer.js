import { CHANGE_CITY } from '../actions/actionTypes';

const citiesArray = ['New York', 'London', 'Paris', 'Singapore', 'San Francisco'];

const initState = {
	query: citiesArray[0]
};

export default function queryReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case CHANGE_CITY:
    	newState = Object.assign({}, state, {
        query: citiesArray[action.index],
        index: action.index
      });
    	break;

    default:
      newState = state;
  }
  return newState;
}

