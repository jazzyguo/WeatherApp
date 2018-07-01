import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import buildStore from './store/store';

const store = buildStore();

render(
  	<Provider store={store}>
  	 	<BrowserRouter>
      		 <Route component={App} />
      	</BrowserRouter>
  	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
