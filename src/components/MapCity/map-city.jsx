import React from 'react';
import pt from 'prop-types';
import cl from 'classnames';
import {pageType} from '../../utils/const.js';


const MapCity = ({type, children}) => {
  const mapClasses = cl(`map`,
      {[`property__map`]: type === pageType.OFFER},
      {[`cities__map`]: type === pageType.MAIN}
  );

  return (
    <section className={mapClasses}>
      {children}
    </section>
  );
};

MapCity.propTypes = {
  type: pt.oneOf([pageType.MAIN, pageType.OFFER]).isRequired,
  children: pt.node.isRequired,
};

export default MapCity;
