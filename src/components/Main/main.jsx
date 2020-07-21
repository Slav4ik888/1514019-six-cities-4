import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CardList from '../CardList/card-list.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import MapCity from '../MapCity/map-city.jsx';
import CitiesList from '../CitiesList/cities-list.jsx';
import {cities, coordsCities, AppRoute, placesType} from '../../utils/const.js';
import withFocusCard from '../../hocs/with-focus-card/with-focus-card.js';
import withMap from '../../hocs/with-map/with-map.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import PlacesSorting from '../PlacesSorting/places-sorting.jsx';
import withSort from '../../hocs/with-sort/with-sort.js';

const CitiesListWrapped = withActiveItem(CitiesList);
const CardListWrapped = withFocusCard(withActiveItem(CardList));
const MapCityWrapped = withMap(MapCity);
const PlacesSortingWrapped = withSort(PlacesSorting);
const Main = (props) => {

  const {authInfo, userStatus,
    offers, onCardTitleClick,
    activeCity, onChangeCity} = props;
  // console.log('MAIN userStatus: ', userStatus);
  // console.log('MAIN authInfo: ', authInfo);

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
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={userStatus === `AUTH` ? AppRoute.FAVORITES : AppRoute.LOGIN}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      {userStatus === `AUTH` ?
                        <span className="header__user-name user__name">{authInfo.email}</span>
                        : <span className="header__login">Sign in</span>
                      }
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>


        <main className="page__main page__main--index">
          <CitiesListWrapped
            activeCity={activeCity}
            onItemClick={onChangeCity}
          />

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length ? `${offers.length} places to stay ` :
                    `No places to stay available `}
                  in {cities[activeCity]} </b>

                <PlacesSortingWrapped />

                <div className="cities__places-list places__list tabs__content">
                  <CardListWrapped
                    type={placesType.CITY}
                    offers={offers}
                    onItemClick={onCardTitleClick}
                  />;
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <MapCityWrapped
                    offers={offers}
                    activeCoords={coordsCities[activeCity]}
                  />
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
  userStatus: PropTypes.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  authInfo: PropTypes.object,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCity: PropTypes.number.isRequired,
  onChangeCity: PropTypes.func.isRequired,
};

export default Main;
