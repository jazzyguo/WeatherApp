import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrrentWeather } from '../../actions/actions';
import PropTypes from 'prop-types';
import { convertTemp, toTitleCase } from '../../util/utils';
import { bindAll} from 'lodash';
import BGImage from '../BGImage/BGImage';
import TextCarousel from '../Carousel/TextCarousel';
import './Overview.css';

class Overview extends Component {

	constructor(props, context) {
  	super(props);

  	bindAll(this, [
  		'_changeScale'
  	]);

  	this.state = {
  		metric: false // flag for F/C conversion
  	}
  }

  componentWillMount() {
  	const { actions, query } = this.props;

  	actions.getCurrrentWeather(query);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, query } = this.props;

    if(nextProps.query !== query) {
      actions.getCurrrentWeather(nextProps.query);
    }
  }

  _changeScale() {
  	this.setState({metric: !this.state.metric})
  }

  render() {
  	const { metric } = this.state;
  	const { currentWeather, loading } = this.props;
  	const { name, weather, main } = currentWeather;

    return (
      <div className="overview">
	      {!loading &&
	      	<div className="overview__header">
	      		<span className="overview__header-city">
	      			<TextCarousel />
	      		</span>
	      		<span className="overview__header-desc">
	      			{ toTitleCase(weather[0].description) }
	      		</span>
	      		<div onClick={this._changeScale} 
	      			   className="overview__header-temp">
	      			<img src={`/img/icons/${weather[0].icon}.png`} alt=""/>
		      		{!metric 
		      			? (<span>{ main.temp }&#8457;</span>) 
		     				: (<span>{ convertTemp(main.temp) }&#8451;</span>)
		      		}
	      		</div>
	      	</div>
	      } 
	     	{!loading &&
	      	<BGImage type={weather[0].id} 
	      				   daytime={weather[0].icon.includes('d')}/>
	    	}
      </div>
    );
  }
}

/*
 * @ {actions}
 * @ {currentWeather} - currentWeather data
 * @ {loading} - tracks loading state 
 * @ {query} - current city
 */
Overview.propTypes = {
	actions: PropTypes.object,
  currentWeather: PropTypes.object,
  loading: PropTypes.bool,
  query: PropTypes.oneOfType([
  	PropTypes.string,
  	PropTypes.number
	])
};

const mapStateToProps = (state) => {
  return {
    currentWeather: state.weather.currentWeather,
    loading: state.weather.loading,
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