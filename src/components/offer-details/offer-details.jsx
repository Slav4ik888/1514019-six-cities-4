import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import Page from '../page/page.jsx';
import ButtonFavorite from '../button-favorite/button-favorite.jsx';
import ReviewsList from './reviews-list/reviews-list.jsx';
import FormReview from './form-review/form-review.jsx';
import MapCity from '../map-city/map-city.jsx';
import CardList from '../card-list/card-list.jsx';

import {AuthStatus} from '../../reducers/user/user.js';
import {getUserStatus} from '../../reducers/user/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';
import {getOfferFromRouteId, getNearbyOffers, getComments, getIsLoading} from '../../reducers/data/selectors.js';
import {ActionCreator as ActionCreatorTravel} from '../../reducers/travel/travel.js';
import {getActiveCity, getActiveOffer} from '../../reducers/travel/selectors.js';

import withMap from '../../hocs/with-map/with-map.js';
import withFocusCard from '../../hocs/with-focus-card/with-focus-card.js';
import withForm from '../../hocs/with-form/with-form.js';
import withFavorite from '../../hocs/with-favorite/with-favorite.js';

import {AppRoute, coordsCities, placesType, pageType, citiesIdx} from '../../utils/const.js';
import {getRating} from '../../utils/utils.js';


const ButtonFavoriteWrapped = withFavorite(ButtonFavorite);
const MapCityWrapped = withMap(MapCity);
const CardListWrapped = withFocusCard(CardList);
const FormReviewWrapped = withForm(FormReview);


const OfferDetails = ({selectedOffer, isLoading,
  activeOffer, reviews, activeCity,
  nearbyOffers, handleCardTitleClick, userStatus}) => {

  // console.log('selectedOffer: ', selectedOffer);
  if (isLoading) {
    // console.log('isLoading', isLoading);
    return null;
  }

  if (!activeOffer) {
    // console.log(1);

    if (!selectedOffer || selectedOffer === -1) {
      // console.log(`!selectedOffer`);
      return null;
    }

    // console.log(2);
    handleCardTitleClick(selectedOffer);
    return null;
  } else {
    // console.log(3);
    if (activeOffer !== selectedOffer) {
      // console.log(4);
      handleCardTitleClick(selectedOffer);
      return null;
    }
    // console.log(5);
  }
  // console.log(`защита 1 пройдена`);
  if (!activeOffer) {
    // console.log(666);
    return <Redirect to={AppRoute.MAIN}/>;
  }
  if (!nearbyOffers) {
    // console.log(`Нирби`);
    handleCardTitleClick(selectedOffer);
  }
  // console.log(`защита 2 пройдена`);


  const {isPremium, pictures, amenities, bedrooms, maxGuestsNumber,
    description, host, price, rating, cardTitle, offerType,
  } = activeOffer;

  return (
    <Page type={pageType.OFFER}>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {pictures
                .slice(0, 6)
                .map((img, i) => <div key={`${img}+${i}`} className="property__image-wrapper">
                  <img className="property__image" src={img} alt={cardTitle} />
                </div>)}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {cardTitle}
                </h1>
                <ButtonFavoriteWrapped
                  offer={activeOffer}
                  type={placesType.OFFER_DETAILS}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRating(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxGuestsNumber} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {amenities.map((item) => (
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.super ? `property__avatar-wrapper--pro` : ``}`}>
                    <img className="property__avatar user__avatar"
                      src={host.photo ? host.photo : `img/avatar.svg`}
                      width="74" height="74" alt={host.name} />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  {description.split(`\n`).map((paragraph, i) => (
                    <p key={`${paragraph.slice(0, 5)}-${i}`} className="property__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>

                {userStatus === AuthStatus.AUTH ? <FormReviewWrapped/> : null}
              </section>
            </div>
          </div>

          <MapCityWrapped
            offers={nearbyOffers}
            activeCoords={coordsCities[activeCity]}
            activeOffer={activeOffer}
            type={pageType.OFFER}
          />

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <CardListWrapped
                type={placesType.CITY}
                offers={nearbyOffers}
                onItemClick={handleCardTitleClick}
              />;

            </div>
          </section>
        </div>
      </main>
    </Page>
  );
};

OfferDetails.propTypes = {
  userStatus: pt.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]).isRequired,
  activeOffer: pt.shape(offerPropTypes),
  selectedOffer: pt.any,
  // pt.oneOf([pt.shape(offerPropTypes), pt.number, pt.instanceOf(null)]),
  nearbyOffers: pt.arrayOf(
      pt.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCity: pt.number.isRequired,
  reviews: pt.array,
  handleCardTitleClick: pt.func.isRequired,
  isLoading: pt.bool.isRequired,

};

const mapStateToProps = (state, props) => ({
  selectedOffer: getOfferFromRouteId(state, props),
  userStatus: getUserStatus(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  reviews: getComments(state),
  nearbyOffers: getNearbyOffers(state),
  isLoading: getIsLoading(state),

});

const mapDispatchToProps = (dispatch) => ({
  handleCardTitleClick(offer) {
    dispatch(ActionCreatorTravel.setActiveOffer(offer));
    dispatch(ActionCreatorTravel.changeCity(citiesIdx[offer.city.name]));

    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNearbyOffers(offer.id));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
