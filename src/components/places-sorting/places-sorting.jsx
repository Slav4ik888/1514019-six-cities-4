import React from 'react';
import pt from 'prop-types';

const PlacesSorting = ({children}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      {children}
    </form>
  );
};

PlacesSorting.propTypes = {
  children: pt.oneOfType([
    pt.arrayOf(pt.node),
    pt.node
  ]).isRequired,
};

export default PlacesSorting;
