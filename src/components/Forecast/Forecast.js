import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getForecastWeather } from '../../actions/actions';
import PropTypes from 'prop-types';
import { convertTemp } from '../../util/utils';
import { bindAll, debounce } from 'lodash';
import { Link } from 'react-router-dom'
import './Forecast.css';

class Forecast extends PureComponent {

	constructor(props, context) {
  	super(props);

  	bindAll(this, [

  	]);

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

  render() {

    return (
      <div className="forecast">
        FORECASST
        <Link to='/'>OVERVIEW</Link>
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
  ])
};

const mapStateToProps = (state) => {
  return {
    forecast: state.weather.forecast,
    forecastLoading: state.weather.loading,
    query: state.query.query
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