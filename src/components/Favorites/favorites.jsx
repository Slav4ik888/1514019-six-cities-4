import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
// import {offerPropTypes} from '../../utils/prop-types-templates.js';

import Page from '../page/page.jsx';
import CardList from '../card-list/card-list.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

import {ActionCreator} from '../../reducers/travel/travel.js';
import {getFavorites} from '../../reducers/data/selectors.js';

import {pageType, placesType, cities} from '../../utils/const.js';


const CardListWrapped = withActiveItem(CardList);


const Favorites = ({handleCardTitleClick, favorites}) => {
  return (
    <>
      <Page type={pageType.FAVORITES}>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city, i) => {
                  if (favorites[city]) {
                    return (
                      <li key={`${favorites[city]}+${i}`}
                        className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <CardListWrapped
                            type={placesType.FAVORITE}
                            offers={favorites[city]}
                            onItemClick={handleCardTitleClick}
                          />
                        </div>
                      </li>
                    );
                  }
                  return false;
                })}
              </ul>
            </section>
          </div>
        </main>
      </Page>
    </>
  );
};

Favorites.propTypes = {
  handleCardTitleClick: pt.func.isRequired,
  favorites: pt.object,
};


const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
