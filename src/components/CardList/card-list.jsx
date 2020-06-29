import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.jsx';
import {offerTypes} from '../../utils/const.js';


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
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        isFavourite: PropTypes.bool.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        offerType: PropTypes.oneOf([offerTypes.apartment, offerTypes.room, offerTypes.house, offerTypes.hotel]).isRequired,
      }).isRequired
  ).isRequired,
};

export default CardList;
