import React, { PureComponent } from 'react';
import './App.css';
import Overview from '../Overview/Overview';
import Forecast from '../Forecast/Forecast';
import TextCarousel from '../Carousel/TextCarousel';
import BGImage from '../BGImage/BGImage';
import { Switch, Route } from 'react-router-dom'

class App extends PureComponent {

  render() {
    return (
      <div className="app">
      	<TextCarousel />
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
