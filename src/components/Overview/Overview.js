import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertTemp, unixToTime, scrollUp } from '../../util/utils';
import { Link } from 'react-router-dom';
import './Overview.css';

class Overview extends PureComponent {

  /* Last update time
   * High/Low Temp & Humidity
   */
  _renderMainInfo() {
    const { currentWeather: { 
      dt, main: { humidity, temp_max, temp_min } 
    }, celsius } = this.props;

    return (
      <Fragment>
        <span>Last Updated: { unixToTime(dt) }</span>
        {!celsius &&
          <h1>H {Math.ceil(temp_max)}&deg; / 
              L {Math.floor(temp_min)}&deg;</h1>
        }
        {celsius &&
          <h1>H {Math.ceil(convertTemp(temp_max))}&deg; / 
              L {Math.floor(convertTemp(temp_min))}&deg;</h1>
        }
        <div className="overview__item-row-1 humidity">
          {
            (humidity >= 90) 
              ? <i className="fas fa-thermometer-full"></i>
              : (humidity >= 75 && humidity < 90) 
                ? <i className="fas fa-thermometer-three-quarters"></i>
                : (humidity >= 50 && humidity < 75)
                  ? <i className="fas fa-thermometer-half"></i>
                  : (humidity >= 25 && humidity < 50)
                    ? <i className="fas fa-thermometer-quarter"></i>
                    : <i className="fas fa-thermometer-empty"></i>
          }
          <span className="title">Humidity</span>
          <span>{humidity}%</span>
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
            <span className="title">Wind Pressure</span>
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
    const {currentWeather: { sys }, loading } = this.props;

    return (
      <Fragment>
        <div className="overview__item-row-2 sunrise__row-2">
          <div className="overview__item-row-1 sunrise__row-1">
            <img src="/img/sunset.png" alt="sunset"/>
          </div>
          {!loading &&
            <div className="overview__item-row-1 sunrise__row-1">
              <span>{unixToTime(sys.sunrise)}</span>
              <span>{unixToTime(sys.sunset)}</span>
            </div>
          }
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
            { this._renderSunrise() }
          </div>
        </div>
        <Link className="overview__link"
              to='/forecast'
              onClick={scrollUp}>
              5 DAY FORECAST</Link>
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