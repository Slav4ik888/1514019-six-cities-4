import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const.js';
import PropTypes from 'prop-types';
import {cities} from '../../utils/const.js';

const CitiesList = (props) => {
  const {activeCity, onItemClick} = props;

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
                  onClick={() => (onItemClick(i))}
                >
                  <Link className={`locations__item-link tabs__item
                  ${(activeCity === i) && isActive}`}
                  to={AppRoute.ROOT}>
                    <span>{item}</span>
                  </Link>
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
  onItemClick: PropTypes.func.isRequired,
};


export default CitiesList;
