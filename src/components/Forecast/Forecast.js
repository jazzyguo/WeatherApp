import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../../actions/actions';
import PropTypes from 'prop-types';
import { convertTemp } from '../../util/utils';
import { bindAll, debounce } from 'lodash';
import BGImage from '../BGImage/BGImage';
import './Forecast.css';

class Forecast extends PureComponent {

	constructor(props, context) {
  	super(props);

  	bindAll(this, [

  	]);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }


  render() {

    return (
      <div className="forecast">
        FORECASST
      </div>
    );
  }
}

/*
 *
 */
Forecast.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecast);