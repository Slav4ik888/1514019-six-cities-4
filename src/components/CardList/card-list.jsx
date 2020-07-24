import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/card.jsx';

import {placesType} from '../../utils/const.js';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import withFavorite from '../../hocs/with-favorite/with-favorite.js';

const CardWrapped = withFavorite(Card);


const CardList = ({offers, onItemClick, onCardFocusEnter,
  onCardFocusLeave, type}) => {

  return (
    <>
      {offers.map((offer) => {
        return <CardWrapped
          key={offer.id}
          type={type}
          offer={offer}
          onCardTitleClick={onItemClick}
          onCardFocusEnter={onCardFocusEnter}
          onCardFocusLeave={onCardFocusLeave}
        />;
      })}
    </>
  );
};

CardList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  onCardFocusEnter: PropTypes.func.isRequired,
  onCardFocusLeave: PropTypes.func.isRequired,
  type: PropTypes.oneOf([placesType.CITY, placesType.NEAR]).isRequired,
};

export default CardList;
