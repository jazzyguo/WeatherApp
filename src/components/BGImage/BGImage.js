import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BGImage.css';

class BGImage extends Component {

  _fetchImage(){
  	const { type, daytime } = this.props;
  	let imageType;


  	if(type === 800) {
  		daytime 
  			? imageType = 'clear-d'
  			: imageType = 'clear-n';
  	} else {
	  	switch(parseInt((type + '').charAt(0))) {
	  		case 2:
	  			imageType = 'thunder';
  				break;
	  		case 3:
	  			imageType = 'rain';
	  			break;
	  		case (5 || 6):
	  			imageType = 'rain';
	  			break;
	  		case 8:
	  			daytime 
  					? imageType = 'cloudy-d'
  					: imageType = 'cloudy-n';
  				break;
	  	}
  	}

  	return (
  		<img src={`/img/bg/${imageType}.png`} alt=""/>
  	);
  }

  render() {
    return (
      <div className="bg-image">
       	{ this._fetchImage() }
      </div>
    );
  }
}

export default BGImage;

/*
 * @ {type} - ID for weather type
 * @ {daytime} - flag for daytime
 */
BGImage.propTypes = {
	type: PropTypes.number,
	daytime: PropTypes.bool
};