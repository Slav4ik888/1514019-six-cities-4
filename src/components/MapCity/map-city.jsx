import React from 'react';
import pt from 'prop-types';

const MapCity = ({children}) => {
  return (
    <>
    {children}
    </>
  );
};

MapCity.propTypes = {
  children: pt.node.isRequired,
};

export default MapCity;
