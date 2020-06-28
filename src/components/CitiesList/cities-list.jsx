import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  // const { }
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default CitiesList;
