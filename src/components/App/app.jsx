import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';


const App = (props) => {
  const {offers} = props;
  return (
    <Main offers={offers} />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        cardMark: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        priceValue: PropTypes.number.isRequired,
        priceText: PropTypes.string.isRequired,
        raiting: PropTypes.number.isRequired,
        cardName: PropTypes.string.isRequired,
        cardType: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
