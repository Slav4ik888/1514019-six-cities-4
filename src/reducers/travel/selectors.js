import {NameSpace} from '../name-space.js';

const NAME_SPACE = NameSpace.TRAVEL;

export const getActiveCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};
