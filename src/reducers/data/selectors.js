import {NameSpace} from '../name-space.js';
import {cities} from '../../utils/const.js';


const NAME_SPACE = NameSpace.DATA;

export const getAllOffers = (state) => {
  return state[NAME_SPACE].allOffers;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getNearbyOffers = (state) => {
  return state[NAME_SPACE].nearbyOffers;
};

export const getIsLoading = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getReview = (state) => {
  return state[NAME_SPACE].review;
};

export const getIsError = (state) => {
  return state[NAME_SPACE].isError;
};

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getIsFavoritesEmpty = (state) => {
  const fav = state[NAME_SPACE].favorites;
  let result = true;

  cities.forEach((city) => {
    if (fav[city]) {
      if (fav[city].length) {
        result = false;
        return true;
      }
    }
    return false;
  });

  return result;
};

