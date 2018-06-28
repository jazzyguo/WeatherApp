import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrrentWeather } from '../../actions/actions';
import PropTypes from 'prop-types';
import { convertTemp, toTitleCase } from '../../util/utils';
import { bindAll, debounce } from 'lodash';
import TextCarousel from '../Carousel/TextCarousel';
import './Header.css';

class Header extends PureComponent {

	constructor(props, context) {
  	super(props);

  	bindAll(this, [
  		'_changeScale'
  	]);

  	this.state = {
  		metric: false // flag for F/C conversion
  	}

    props.actions.getCurrrentWeather = debounce(props.actions.getCurrrentWeather, 500);
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

  /* changes between imperial and metric scale
   */
  _changeScale() {
  	this.setState({metric: !this.state.metric})
  }

  _renderHeader() {
    const { metric } = this.state;
    const { currentWeather: { weather, main } } = this.props;

    return (
      <React.Fragment>
        <span className="overview__header-desc">
          { toTitleCase(weather[0].description) }
        </span>
        <div onClick={this._changeScale} 
             className="overview__header-temp">
          <img src={`/img/icons/${weather[0].icon}.png`} alt=""/>
          {!metric 
            ? (<span>{ ~~main.temp }&#8457;</span>) 
            : (<span>{ ~~convertTemp(main.temp) }&#8451;</span>)
          }
        </div>
      </React.Fragment>
    );
  }

  render() {
  	const { loading } = this.props;

    return (
        <div className="overview">
          <TextCarousel />
        	<div className="overview__header">
            {!loading && 
              this._renderHeader() 
            }
        	</div>
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
Header.propTypes = {
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
)(Header);