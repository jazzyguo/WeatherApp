import React, { PureComponent } from 'react';
import { bindAll } from 'lodash';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCity } from '../../actions/actions';
import PropTypes from 'prop-types';
import './TextCarousel.css';

class TextCarousel extends PureComponent {
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
      <div className="carousel__container">
      	<Carousel
      		onSelect={this._handleSelect}
      		indicators={false}
      		interval={null}
      		activeIndex={this.props.index}
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
      </div>
    );
  }
}

/*
 * @ {changeCity} - function used to change current city
 * @ {index} - maintains active carousel index
 */
TextCarousel.propTypes = {
  changeCity: PropTypes.func,
  index: PropTypes.number
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
