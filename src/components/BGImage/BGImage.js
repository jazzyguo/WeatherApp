import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindAll} from 'lodash';
import './BGImage.css';

class BGImage extends PureComponent {
  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_fetchImage'
    ]);

    this.prevImageType = "";
  }
  
  /* openweather api differentiates between
   * weather types on an ID
   * this uses that ID to fetch different bg images
   */
  _fetchImage(){
    const { loading, currentWeather: { weather } } = this.props;
    const type = !loading ? weather[0].id : null;
    const daytime = !loading ? weather[0].icon.includes('d') : null;
    let imageType;

    if(type === 800) {
      daytime 
        ? imageType = 'clear-d'
        : imageType = 'clear-n';
    } else {
      switch(parseInt((type + '').charAt(0), 10)) {
        case 2:
          imageType = 'thunder';
          break;
        case 3:
          imageType = 'rain';
          break;
        case 5:
          imageType = 'rain';
          break;
        case 6:;
          imageType = 'snow';
          break;
        case 7:
          imageType = 'mist';
          break;
        case 8:
          daytime 
            ? imageType = 'cloudy-d'
            : imageType = 'cloudy-n';
          break;
        default:
          imageType = null;
      }
    }
    if(imageType) {
      this.prevImageType = imageType;
    }
    return (
      <img src={`/img/bg/${!loading ? imageType : this.prevImageType}.png`} alt=""/>
    );
  }

  render() {
    return (
      <div className="bg-image">
        { this._fetchImage() }
        <span>Images from 
          <a href="https://www.pexels.com"> https://www.pexels.com</a>
        </span>
      </div>
    );
  }
}

/*
 * @ {type} - ID for weather type
 * @ {daytime} - flag for daytime
 * @ {loading} - tracked to manage prev saved image
 */
BGImage.propTypes = {
  type: PropTypes.number,
  daytime: PropTypes.bool,
  loading: PropTypes.bool,
  CurrentWeather: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loading: state.weather.loading,
    currentWeather: state.weather.currentWeather
  };
}

export default connect(
  mapStateToProps,
  null
)(BGImage);