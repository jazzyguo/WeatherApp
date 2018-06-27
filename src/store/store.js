import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from '../reducers/weatherReducer';
import queryReducer from '../reducers/queryReducer';

export default function buildStore() {

  const _reducers = combineReducers({
    weather: weatherReducer,
    query: queryReducer
  });

  return createStore(
    _reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}