import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';


class CardList extends PureComponent {

  render() {
    const {offers,
      onItemClick,
      focusCard,
      onCardFocusEnter, onCardFocusLeave,
    } = this.props;

    return (
      <>
        {offers.map((offer) => {
          return <Card
            key={offer.id}
            offer={offer}
            onCardTitleClick={onItemClick}
            focusCard={focusCard}
            onCardFocusEnter={onCardFocusEnter}
            onCardFocusLeave={onCardFocusLeave}
          />;
        })}
      </>
    );
  }
}


CardList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  onCardFocusEnter: PropTypes.func.isRequired,
  onCardFocusLeave: PropTypes.func.isRequired,
  focusCard: PropTypes.shape(offerPropTypes),
};

export default CardList;
