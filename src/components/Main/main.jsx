import React from 'react';
import PropTypes from 'prop-types';
import CardList from '../CardList/card-list.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import MapCity from '../MapCity/map-city.jsx';
import CitiesList from '../CitiesList/cities-list.jsx';
import {cities, coordsCities} from '../../utils/const.js';
import withFocusCard from '../../hocs/with-focus-card/with-focus-card.js';
import withMap from '../../hocs/with-map/with-map.js';

const CardListWrapped = withFocusCard(CardList);
const MapCityWrapped = withMap(MapCity);

const Main = (props) => {

  const {offers, onCardTitleClick, activeCity, onChangeCity} = props;

  return (
    <>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>


        <main className="page__main page__main--index">
          <CitiesList
            activeCity={activeCity}
            onChangeCity={onChangeCity}
          />

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length ? `${offers.length} places to stay ` :
                    `No places to stay available `}
                  in {cities[activeCity]} </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>

                  {/* <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" selected="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select>
                  */}
                </form>

                <div className="cities__places-list places__list tabs__content">
                  <CardListWrapped
                    offers={offers}
                    onCardTitleClick={onCardTitleClick}
                  />;
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <MapCityWrapped offers={offers} activeCoords={coordsCities[activeCity]}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div >
    </>
  );
};


Main.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCity: PropTypes.number.isRequired,
  onChangeCity: PropTypes.func.isRequired,
};

export default Main;
