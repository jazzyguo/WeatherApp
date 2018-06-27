import { CHANGE_CITY } from '../actions/actionTypes';

/*********** 
five cities for project specs
New York, London, Paris, Singapore, San Francisco
************/
const cityIDs = [5128581];

const initState = {
	query: cityIDs[0] // default NYC ID
};

export default function queryReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case CHANGE_CITY:
    	newState = Object.assign({}, state, {
        query: ''
      });
    	break;

    default:
      newState = state;
  }
  return newState;
}

