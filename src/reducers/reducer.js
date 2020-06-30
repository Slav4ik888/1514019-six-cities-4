import {offers} from '../mocks/offers.js';
import {extend} from '../utils/utils.js';
import {cities} from '../utils/const.js';


const initialState = {
  activeCity: 0,
  offers: offers[cities[0]],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (id) => ({
    type: ActionType.CHANGE_CITY,
    payload: id,
  }),

  getOffers: (city) => ({
    type: ActionType.GET_OFFERS,
    payload: city,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: offers[action.payload],
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
