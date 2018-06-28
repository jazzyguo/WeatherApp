import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCity } from '../../actions/actions';
import PropTypes from 'prop-types';
import './TextCarousel.css';

class TextCarousel extends Component {
  constructor(props, context) {
    super(props);

    bindAll(this, [
  		'_handleSelect'
  	]);
  }

  _handleSelect(selectedIndex) {
  	this.props.changeCity(selectedIndex);
  }

  render() {
    return (
    	<Carousel
    		onSelect={this._handleSelect}
    		indicators={false}
    		interval={null}
    		defaultActiveIndex={this.props.index}
    	>
    		<Carousel.Item>
    			<span>New York</span>
    		</Carousel.Item>
    		<Carousel.Item>
    			<span>London</span>
    		</Carousel.Item>
    		<Carousel.Item>
    			<span>Paris</span>
    		</Carousel.Item>
    		<Carousel.Item>
    			<span>Singapore</span>
    		</Carousel.Item>
    		<Carousel.Item>
    			<span>San Francisco</span>
    		</Carousel.Item>
    	</Carousel>
    );
  }
}

/*
 * @ {changeCity} - function used to change current city
 */
TextCarousel.propTypes = {
  changeCity: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    index: state.query.index,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCity: bindActionCreators(changeCity, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextCarousel);
