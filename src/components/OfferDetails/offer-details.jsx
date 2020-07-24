import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import Page from '../Page/page.jsx';
import {ReviewsList} from '../ReviewsList/reviews-list.jsx';
import MapCity from '../MapCity/map-city.jsx';
import CardList from '../CardList/card-list.jsx';

import {getRating} from '../../utils/utils.js';
import {getNearbyOffers, getComments} from '../../reducers/data/selectors.js';
import {ActionCreator} from '../../reducers/travel/travel.js';
import {getActiveCity, getActiveOffer} from '../../reducers/travel/selectors.js';

import withMap from '../../hocs/with-map/with-map.js';
import withFocusCard from '../../hocs/with-focus-card/with-focus-card.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

import {coordsCities, placesType, pageType} from '../../utils/const.js';


const MapCityWrapped = withMap(MapCity);
const CardListWrapped = withFocusCard(withActiveItem(CardList));


const OfferDetails = ({activeOffer, reviews, activeCity,
  nearbyOffers, handleCardTitleClick}) => {

  const {isPremium, pictures, amenities, bedrooms, maxGuestsNumber,
    description, host, price, rating, cardTitle, offerType,
  } = activeOffer;

  // Выводим города поблизости
  // const nearbyOffers = getNearbyOffers(allOffers[cities[activeCity]], 3, coordinates, false);

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
                <button className={`property__bookmark-button button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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

              <ReviewsList reviews={reviews}/>

            </div>
          </div>

          <section className="property__map map">
            <MapCityWrapped
              offers={nearbyOffers}
              activeCoords={coordsCities[activeCity]}
              activeOffer={activeOffer}
            />
          </section>

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
  activeOffer: PropTypes.shape(offerPropTypes).isRequired,
  nearbyOffers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCity: PropTypes.number.isRequired,
  reviews: PropTypes.array,
  handleCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  reviews: getComments(state),
  nearbyOffers: getNearbyOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
