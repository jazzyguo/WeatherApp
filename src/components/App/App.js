import React, { PureComponent } from 'react';
import './App.css';
import Overview from '../Overview/Overview';
import TextCarousel from '../Carousel/TextCarousel';

class App extends PureComponent {

  render() {
    return (
      <div className="app">
      	<TextCarousel />
        <Overview />
      </div>
    );
  }
}

export default App;
