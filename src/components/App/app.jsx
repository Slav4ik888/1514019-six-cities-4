import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';


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
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
};

export default App;
