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
  offers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
