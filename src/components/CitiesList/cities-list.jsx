import React from 'react';
import PropTypes from 'prop-types';
import {cities} from '../../utils/const.js';

const CitiesList = (props) => {
  const {activeCity, onChangeCity} = props;

  const isActive = `tabs__item--active`;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">

            {cities.map((item, i) => {
              return (
                <li key={item} className="locations__item"
                  onClick={() => (onChangeCity(i, item))}
                >
                  <a className={`locations__item-link tabs__item
                  ${(activeCity === i) && isActive}`} href="#">
                    <span>{item}</span>
                  </a>
                </li>
              );
            })}

          </ul>
        </section>
      </div>
    </>
  );
};

CitiesList.propTypes = {
  activeCity: PropTypes.number.isRequired,
  onChangeCity: PropTypes.func.isRequired,
};


export default CitiesList;
