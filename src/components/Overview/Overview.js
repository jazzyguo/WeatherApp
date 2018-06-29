import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertTemp, unixToTime } from '../../util/utils';
import { Link } from 'react-router-dom'
import './Overview.css';

class Overview extends PureComponent {

  /* Last update time
   * High/Low Temp & Humidity
   */
  _renderMainInfo() {
    const { currentWeather: { dt, main }, celsius } = this.props;

    return (
      <Fragment>
        <span>Last Updated: { unixToTime(dt) }</span>
        {!celsius &&
          <h1>H {main.temp_max}&deg; / 
              L {main.temp_min}&deg;</h1>
        }
        {celsius &&
          <h1>H {~~convertTemp(main.temp_max)}&deg; / 
              L {~~convertTemp(main.temp_min)}&deg;</h1>
        }
        <div className="overview__item-row-1">
          <span className="title">Humidity</span>
          <span>{main.humidity}%</span>
        </div>
      </Fragment>
    );
  }

  /* Wind Speed / Pressue
   * Cloudiness & Visibility
   */
  _renderOtherInfo() {
    const { currentWeather: { main, wind, visibility, clouds }} = this.props;

    return (
      <Fragment>
        <div className="overview__item-row-2">
          <div className="overview__item-row-1">
            <span className="title">Wind Speed</span>
            <span>{wind.speed} mph</span>
          </div>
          <div className="overview__item-row-1">
            <span className="title">Wind Pressue</span>
            <span>{main.pressure} hPa</span>
          </div>
        </div>
        <div className="overview__item-row-2">
          <div className="overview__item-row-1">
            <span className="title">Cloudiness</span>
            <span>{clouds.all}%</span>
          </div>
          <div className="overview__item-row-1">
            <span className="title">Visibility</span>
            <span>{(visibility * 0.000621371).toFixed(1)} mi</span>
          </div>
        </div>
      </Fragment>
    );
  }

  /* Sunrise / Sunset info
   */
  _renderSunrise() {
    const {currentWeather: { sys } } = this.props;

    return (
      <Fragment>
        <div className="overview__item-row-2 sunrise__row-2">
          <div className="overview__item-row-1 sunrise__row-1">
            <span>img</span>
          </div>
          <div className="overview__item-row-1 sunrise__row-1">
            <span>{unixToTime(sys.sunrise)}</span>
            <span>{unixToTime(sys.sunset)}</span>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="overview">
        <div className="overview__grid">
          <div className="overview__item two-col">
            {!loading &&
              this._renderOtherInfo()
            }
          </div>
          <div className="overview__item">
            {!loading &&
              this._renderMainInfo()
            }
          </div>
          <div className="overview__item sunrise">
            {!loading &&
              this._renderSunrise()  
            }
          </div>
        </div>
        <Link className="overview__link"
              to='/forecast'>5 DAY FORECAST</Link>
      </div>
    );
  }
}

Overview.propTypes = {
   currentWeather: PropTypes.object,
   loading: PropTypes.bool,
  celsius: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    loading: state.weather.loading,
    currentWeather: state.weather.currentWeather,
    celsius: state.weather.celsius
  };
}

export default connect(
  mapStateToProps,
  null
)(Overview);