import React, { PureComponent } from 'react';
import Header from '../Header/Header';
import Overview from '../Overview/Overview';
import Forecast from '../Forecast/Forecast';
import BGImage from '../BGImage/BGImage';
import { Switch, Route } from 'react-router-dom'
import './App.css';

class App extends PureComponent {

  render() {
    return (
      <div className="app">
      	<Header />
      	<BGImage />
        <Switch>
          <Route exact path='/' component={Overview}/>
          <Route path='/forecast' component={Forecast}/>
    	</Switch>
      </div>
    );
  }
}

export default App;
