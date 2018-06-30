import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getForecastWeather } from '../../actions/actions';
import PropTypes from 'prop-types';
import { convertTemp, calcDailyValues,
         dateToString, getWeekDay, scrollUp } from '../../util/utils';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom'
import './Forecast.css';

class Forecast extends PureComponent {

	constructor(props, context) {
  	super(props);

    props.actions.getForecastWeather = debounce(props.actions.getForecastWeather, 500);
  }

  componentWillMount() { 
    const { actions, query } = this.props;

    actions.getForecastWeather(query);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, query } = this.props;

    if(nextProps.query !== query) {
      actions.getForecastWeather(nextProps.query);
    }     
  }

  _renderGridHeader() {
    return (
      <Fragment>
        <div className="forecast__grid-header forecast__grid-col">
          <div className="forecast__grid-header-day">day</div>
        </div>
        <div className="forecast__grid-header forecast__grid-row">
          <div className="scroll">
            <span>description</span>
            <span>high / low</span>
            <span>wind</span>
            <span>humidity</span>
          </div>
        </div>
      </Fragment>
    );
  }

  /* Takes an object with information regarding the day
   * Object created from calcDailyValues
   */
  _renderGridRow(day, key) {
    const { celsius } = this.props;

    return(
      <Fragment key={key}>
        <div className="forecast__grid-col">
          <div className="day">
            <div>
              <span>
                {(key===0) ? 'Tonight' : getWeekDay(day.date)}
              </span>
              <span className="date">{dateToString(day.date)}</span>
            </div>
            <img src={`/img/icons/${day.icon}${(key===0)?'n':'d'}.png`} 
                 alt={day.description}/>
          </div>
        </div>
        <div className="forecast__grid-row">
          <div className="scroll">
            <span>{day.description}</span>
            {!celsius &&
              <span>{day.temp_max}&deg; / {day.temp_min}&deg;</span>
            }
            {celsius &&
              <span>
                {Math.ceil(convertTemp(day.temp_max))}&deg; 
              / {Math.floor(convertTemp(day.temp_min))}&deg;
              </span>
            }
            <span>{day.wind_speed} mph</span>
            <span>{day.humidity}%</span>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    const { forecast: { list }, forecastLoading } = this.props;

    return (
      <div className="forecast">

        {/*GRID ROW CONSISTS OF ONE COL AND A RESPONSIVE ROW NEXT TO IT*/}
        <div className="forecast__grid">

          { this._renderGridHeader() }

          {!forecastLoading &&
            calcDailyValues(list).map((e, i) => (
              this._renderGridRow(e, i)
            ))
          }
        </div>
        <Link onClick={scrollUp} 
              className="forecast__link"to='/'>
              <i className="fas fa-arrow-left"></i>
              OVERVIEW
        </Link>
      </div>
    );
  }
}

/*
 * @ {forecast} - data from the api with 5day/3hr forecast
 * @ {loading} - tracks loading state 
 * @ {query} - current city
 */
Forecast.propTypes = {
  actions: PropTypes.object,
  forecast: PropTypes.object,
  forecastLoading: PropTypes.bool,
  query: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  celsius: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    forecast: state.weather.forecast,
    forecastLoading: state.weather.forecastLoading,
    query: state.query.query,
    celsius: state.weather.celsius
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getForecastWeather
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecast);