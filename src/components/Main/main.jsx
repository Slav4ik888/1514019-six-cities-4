import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import Page from '../page/page.jsx';
import CardList from '../card-list/card-list.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import MapCity from '../map-city/map-city.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import PlacesSorting from '../places-sorting/places-sorting.jsx';

import withFocusCard from '../../hocs/with-focus-card/with-focus-card.js';
import withMap from '../../hocs/with-map/with-map.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import withSort from '../../hocs/with-sort/with-sort.js';

import {ActionCreator} from '../../reducers/travel/travel.js';
import {getActiveCity, getSortedOffers, getActiveHoverOffer} from '../../reducers/travel/selectors.js';
import {getIsLoading} from '../../reducers/data/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';

import {coordsCities, placesType, pageType} from '../../utils/const.js';


const CitiesListWrapped = withActiveItem(CitiesList);
const CardListWrapped = withFocusCard(CardList);
const MapCityWrapped = withMap(MapCity);
const PlacesSortingWrapped = withSort(PlacesSorting);


const Main = ({isLoading, offers, handleCardTitleClick, activeCity, handleChangeCity, activeHoverOffer}) => {

  if (isLoading || !offers) {
    return null;
  }

  return (
    <>
      <Page type={pageType.MAIN}>

        <main className={`page__main page__main--index ${!offers.length && `page__main--index-empty`}`}>
          <CitiesListWrapped
            activeCity={activeCity}
            onItemClick={handleChangeCity}
          />
          {!!offers.length &&
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>

                  <PlacesSortingWrapped />

                  <div className="cities__places-list places__list tabs__content">
                    <CardListWrapped
                      type={placesType.CITY}
                      offers={offers}
                      onItemClick={handleCardTitleClick}
                    />;
                  </div>
                </section>
                <div className="cities__right-section">
                  <MapCityWrapped
                    offers={offers}
                    activeOffer={activeHoverOffer}
                    activeCoords={coordsCities[activeCity]}
                    type={pageType.MAIN}
                  />
                </div>
              </div>
            </div>
          }
          {!offers.length && <MainEmpty activeCity={activeCity} />}

        </main>
      </Page>
    </>
  );
};


Main.propTypes = {
  handleCardTitleClick: pt.func.isRequired,
  offers: pt.arrayOf(
      pt.shape(offerPropTypes)
  ),
  activeCity: pt.number.isRequired,
  handleChangeCity: pt.func.isRequired,
  activeHoverOffer: pt.shape(offerPropTypes),
  isLoading: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  activeHoverOffer: getActiveHoverOffer(state),
  isLoading: getIsLoading(state),
  offers: getSortedOffers(state),
  activeCity: getActiveCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(id) {
    dispatch(ActionCreator.changeCity(id));
  },
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNearbyOffers(offer.id));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
