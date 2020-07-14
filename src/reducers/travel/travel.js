// import {offers} from '../mocks/offers.js';
import {extend} from '../../utils/utils.js';
// import {cities} from '../utils/const.js';
import {pages} from '../../utils/const.js';


const initialState = {
  activeCity: 0, // № города
  activeOffer: null, // Один Offer
  activePage: pages.MAIN,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  SET_ACTIVE_PAGE: `SET_ACTIVE_PAGE`,
};

const ActionCreator = {
  changeCity: (id) => ({
    type: ActionType.CHANGE_CITY,
    payload: id,
  }),

  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: offer,
  }),

  setActivePage: (page) => ({
    type: ActionType.SET_ACTIVE_PAGE,
    payload: page,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });

    case ActionType.SET_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });

    case ActionType.SET_ACTIVE_PAGE:
      return extend(state, {
        activePage: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
