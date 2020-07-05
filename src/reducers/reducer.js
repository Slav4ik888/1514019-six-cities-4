import {offers} from '../mocks/offers.js';
import {extend} from '../utils/utils.js';
import {cities} from '../utils/const.js';


const initialState = {
  activeCity: 4,
  offers: offers[cities[4]],
  activeOffer: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_ACTIVE_ID: `SET_ACTIVE_ID`,
};

const ActionCreator = {
  changeCity: (id) => ({
    type: ActionType.CHANGE_CITY,
    payload: id,
  }),

  setOffers: (city) => ({
    type: ActionType.SET_OFFERS,
    payload: city,
  }),

  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_ID,
    payload: offer,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });

    case ActionType.SET_OFFERS:
      return extend(state, {
        offers: offers[action.payload],
      });

    case ActionType.SET_ACTIVE_ID:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
