import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/travel/travel.js';
import pt from 'prop-types';

const withFocusCard = (Component) => {
  class WithFocusCard extends PureComponent {
    constructor(props) {
      super(props);
      this._handleCardFocusEnter = this._handleCardFocusEnter.bind(this);
      this._handleCardFocusLeave = this._handleCardFocusLeave.bind(this);
    }

    _handleCardFocusEnter(offer) {
      this.props.setActiveHoverOffer(offer);
    }

    _handleCardFocusLeave() {
      this.props.setActiveHoverOffer(null);
    }

    render() {
      return <Component
        {...this.props}
        onCardFocusEnter={this._handleCardFocusEnter}
        onCardFocusLeave={this._handleCardFocusLeave}
      />;
    }
  }

  WithFocusCard.propTypes = {
    setActiveHoverOffer: pt.func.isRequired
  };

  const mapDispatchToProps = (dispatch) => ({
    setActiveHoverOffer(offer) {
      dispatch(ActionCreator.setActiveHoverOffer(offer));
    }
  });

  return connect(undefined, mapDispatchToProps)(WithFocusCard);
};

export default withFocusCard;
