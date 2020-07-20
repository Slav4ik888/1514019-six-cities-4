import {NameSpace} from '../name-space.js';

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
