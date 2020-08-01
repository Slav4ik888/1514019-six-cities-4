import {createSelector} from 'reselect';

import {NameSpace} from '../name-space.js';
import {sortType, cities} from '../../utils/const.js';
import {getAllOffers} from '../data/selectors.js';


const NAME_SPACE = NameSpace.TRAVEL;

export const getActiveCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

export const getActiveHoverOffer = (state) => {
  return state[NAME_SPACE].activeHoverOffer;
};


export const getSortingType = (state) => {
  return state[NAME_SPACE].sortingType;
};

export const getSortedOffers = createSelector(
    getSortingType,
    getAllOffers,
    getActiveCity,
    (sortingType, allOffers, activeCity) => {
      const oldOffers = allOffers[cities[activeCity]];
      if (oldOffers) {
        const offers = Array.from(oldOffers);
        switch (sortingType) {
          case sortType.POPULAR:
            return offers;

          case sortType.LOW_HIGH:
            return offers.sort((a, b) => a.price - b.price);

          case sortType.HIGH_LOW:
            return offers.sort((a, b) => b.price - a.price);

          case sortType.RATING:
            return offers.sort((a, b) => b.rating - a.rating);

          default:
            return offers;
        }
      }
      return oldOffers;
    }
);


export const getIdFromMatch = (_, props) => {
  if (props.match.params.id) {
    return +props.match.params.id;
  }
  return null;
};


export const getOfferFromRouteId = createSelector(
    getAllOffers,
    getIdFromMatch,
    (allOffers, id) => {
      if (allOffers) {
        let result = null;
        // eslint-disable-next-line consistent-return
        cities.forEach((city) => {
          let res = allOffers[city].find((offer) => offer.id === id);
          if (res) {
            result = res;
          }
        });
        return result;
      } else {
        return null;
      }
    }
);
