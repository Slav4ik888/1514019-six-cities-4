// import {offers} from '../mocks/offers.js';
import {extend} from '../utils/utils.js';
import {cities} from '../utils/const.js';
import {adapterCity} from '../../utils/adapter.js';


const initialState = {
  allOffers: [],
  activeCity: 0,
  offers: [],
  activeOffer: null,
  // offers: offers[cities[0]],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_ACTIVE_ID: `SET_ACTIVE_ID`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  changeCity: (id) => ({
    type: ActionType.CHANGE_CITY,
    payload: id,
  }),

  setOffers: (cityID) => ({
    type: ActionType.SET_OFFERS,
    payload: cityID,
  }),

  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_ID,
    payload: offer,
  }),
};


// Operation это асинхронный ActionCreator
const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((res) => {
        // console.log(`res: `, res.data);
        dispatch(ActionCreator.loadOffers(adapterCity(res.data)));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });

    case ActionType.SET_OFFERS:
      return extend(state, {
        offers: state.allOffers[cities[action.payload]],
      });

    case ActionType.SET_ACTIVE_ID:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
