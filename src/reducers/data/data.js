import {extend} from '../../utils/utils.js';
import {adapterCitiesData} from '../../utils/adapter.js';

const initialState = {
  allOffers: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (allOffers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: allOffers,
    };
  }
};

// Operation это асинхронный ActionCreator
const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((res) => {
        // console.log(`res.data: `, res.data);
        dispatch(ActionCreator.loadOffers(adapterCitiesData(res.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionCreator, ActionType};
