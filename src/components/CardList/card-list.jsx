import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';


class CardList extends PureComponent {
  constructor(props) {
    super(props);
    this._handleCardFocusEnter = this._handleCardFocusEnter.bind(this);
    this._handleCardFocusLeave = this._handleCardFocusLeave.bind(this);

    this.state = {focusCard: null};
  }

  _handleCardFocusEnter(offer) {
    this.setState({focusCard: offer});
  }

  _handleCardFocusLeave() {
    this.setState({focusCard: null});
  }

  render() {
    const {offers, onCardTitleClick} = this.props;

    return (
      <>
        {offers.map((offer) => {
          return <Card
            key={offer.id}
            offer={offer}
            onCardTitleClick={onCardTitleClick}
            handleCardFocusEnter={this._handleCardFocusEnter}
            handleCardFocusLeave={this._handleCardFocusLeave}
          />;
        })}
      </>
    );
  }
}


CardList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
};

export default CardList;
