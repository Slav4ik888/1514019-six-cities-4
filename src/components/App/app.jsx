import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
import {offerTypes} from '../../utils/const.js';

const handleCardTitleClick = () => {};

const App = (props) => {
  const {offers} = props;
  return (
    <Main offers={offers}
      onCardTitleClick={handleCardTitleClick}
    />
  );
};

App.propTypes = {
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

export default App;
