// import {offers} from '../mocks/offers.js';
import {extend} from '../../utils/utils.js';
// import {cities} from '../utils/const.js';


const initialState = {
  activeCity: 0, // № города
  // offers: [], // Офферы для активного города
  activeOffer: null, // Один Offer
  // offers: offers[cities[0]],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  // SET_OFFERS: `SET_OFFERS`,
  SET_ACTIVE_ID: `SET_ACTIVE_ID`,
};

const ActionCreator = {
  changeCity: (id) => ({
    type: ActionType.CHANGE_CITY,
    payload: id,
  }),

  // setOffers: (offers) => ({
  //   type: ActionType.SET_OFFERS,
  //   payload: offers,
  // }),

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

      // case ActionType.SET_OFFERS:
      //   return extend(state, {
      //     // offers: state.allOffers[cities[action.payload]],
      //     offers: action.payload,
      //   });

    case ActionType.SET_ACTIVE_ID:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
