import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrrentWeather } from '../../actions/actions';
import PropTypes from 'prop-types';
import './Overview.css';

class Overview extends Component {

	constructor(props, context) {
  	super(props);
  }

  componentWillMount() {
  	const { actions, query } = this.props;

  	actions.getCurrrentWeather(query);
  }

  render() {
    return (
      <div className="overview">
        
       
      </div>
    );
  }
}

/*
 * @ {actions} 
 * @ {currentWeather} - currentWeather data
 * @ {query} - current city
 */
Overview.propTypes = {
	actions: PropTypes.object,
  currentWeather: PropTypes.object,
  query: PropTypes.oneOfType([
  	PropTypes.string,
  	PropTypes.number
	])
};

const mapStateToProps = (state) => {
  return {
    currentWeather: state.weather.currentWeather,
    query: state.query.query
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getCurrrentWeather
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);