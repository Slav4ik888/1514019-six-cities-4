import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import pt from 'prop-types';

import {getUserStatus, getAuthInfo} from '../../reducers/user/selectors.js';
import {ActionCreator} from '../../reducers/travel/travel.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

import Page from '../Page/page.jsx';
// import Card from '../Card/card.jsx';
import CardList from '../CardList/card-list.jsx';

import {pageType, placesType} from '../../utils/const.js';
import {offers} from '../../mocks/offers.js';


const CardListWrapped = withActiveItem(CardList);


const Favorites = ({handleCardTitleClick}) => {

  return (
    <>
      <Page type={pageType.FAVORITES}>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Paris</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">

                    <CardListWrapped
                      type={placesType.FAVORITE}
                      offers={offers.Paris}
                      onItemClick={handleCardTitleClick}
                    />

                  </div>
                </li>

                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <article className="favorites__card place-card">
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <a href="#">
                          <img className="place-card__image" src="img/apartment-small-04.jpg" width="150" height="110" alt="Place image" />
                        </a>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">&euro;180</b>
                            <span className="place-card__price-text">&#47;&nbsp;night</span>
                          </div>
                          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                            <svg className="place-card__bookmark-icon" width="18" height="19">
                              <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">In bookmarks</span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{width: `100%`}}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <a href="#">White castle</a>
                        </h2>
                        <p className="place-card__type">Apartment</p>
                      </div>
                    </article>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </Page>
    </>
  );
};

Favorites.propTypes = {
  userStatus: pt.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  authInfo: pt.object,
  handleCardTitleClick: pt.func.isRequired,

};


const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
  authInfo: getAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
