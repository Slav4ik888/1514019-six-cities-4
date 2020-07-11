import {extend} from '../../utils/utils.js';
import {adapterCity} from '../../utils/adapter.js';

const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  }
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
  }
  return state;
};

export {reducer, Operation, ActionCreator, ActionType};
