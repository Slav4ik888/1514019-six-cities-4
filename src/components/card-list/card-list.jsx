import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card.jsx';

import {placesType} from '../../utils/const.js';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import withFavorite from '../../hocs/with-favorite/with-favorite.js';


const CardWrapped = withFavorite(Card);


const CardList = ({offers, onCardFocusEnter, onCardFocusLeave, type}) => {

  return (
    <>
      {offers.map((offer, i) => {
        return <CardWrapped
          key={`${offer.id} + ${i}`}
          type={type}
          offer={offer}
          onCardFocusEnter={onCardFocusEnter}
          onCardFocusLeave={onCardFocusLeave}
        />;
      })}
    </>
  );
};

CardList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  onCardFocusEnter: PropTypes.func,
  onCardFocusLeave: PropTypes.func,
  type: PropTypes.oneOf([placesType.CITY, placesType.NEAR, placesType.FAVORITE]).isRequired,
};

export default CardList;
