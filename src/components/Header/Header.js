import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrrentWeather, changeScale } from '../../actions/actions';
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
    this.props.actions.changeScale();
  }

  _renderHeader() {
    const { currentWeather: { weather, main }, celsius } = this.props;

    return (
      <Fragment>
        <span className="header__top-desc">
          { toTitleCase(weather[0].description) }
        </span>
        <div onClick={this._changeScale} 
             className="header__top-temp">
          <img src={`/img/icons/${weather[0].icon}.png`} alt=""/>
          {!celsius 
            ? (<span>{ ~~main.temp }&#8457;</span>) 
            : (<span>{ ~~convertTemp(main.temp) }&#8451;</span>)
          }
        </div>
      </Fragment>
    );
  }

  render() {
  	const { loading } = this.props;

    return (
        <div className="header">
          <TextCarousel />
        	<div className="header__top">
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
  celsius: PropTypes.bool,
  query: PropTypes.oneOfType([
  	PropTypes.string,
  	PropTypes.number
	])
};

const mapStateToProps = (state) => {
  return {
    currentWeather: state.weather.currentWeather,
    loading: state.weather.loading,
    query: state.query.query,
    celsius: state.weather.celsius
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getCurrrentWeather,
      changeScale
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);