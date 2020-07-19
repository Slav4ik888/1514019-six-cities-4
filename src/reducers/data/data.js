import {extend} from '../../utils/utils.js';
import {adapterCitiesData} from '../../utils/adapter.js';

const initialState = {
  allOffers: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  TOGGLE_FAV: `TOGGLE_FAV`,
};

const ActionCreator = {
  loadOffers: (allOffers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: allOffers,
    };
  },
  toggleFavorite: (offer) => {
    return {
      type: ActionType.TOGGLE_FAV,
      payload: offer,
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

    case ActionType.TOGGLE_FAV:
      const city = action.payload.city.name;
      // Находим индекс оффера по id в массиве данного города
      let index = state.allOffers[city].findIndex((item) => item.id === action.payload.id);
      let newAllOffers = state.allOffers;
      newAllOffers[city][index].isFavorite = !newAllOffers[city][index].isFavorite;

      return extend(state, {
        allOffers: newAllOffers,
      });
  }
  return state;
};

export {reducer, Operation, ActionCreator, ActionType};
