import {extend} from '../../utils/utils.js';
// import {AppRoute} from '../../utils/const.js';
import {adapterCitiesData, adapterCommentsData, adapterNearbyData} from '../../utils/adapters.js';
// import {history} from '../../history.js';

const initialState = {
  allOffers: {},
  comments: [],
  nearbyOffers: [],
  isLoading: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  TOGGLE_FAV: `TOGGLE_FAV`,
  SET_IS_LOADING: `SET_IS_LOADING`
};

const ActionCreator = {
  loadOffers: (allOffers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: allOffers,
    };
  },
  loadComments: (reviews) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: reviews,
    };
  },
  loadNearbyOffers: (nearbyOffers) => {
    return {
      type: ActionType.LOAD_NEARBY,
      payload: nearbyOffers,
    };
  },
  toggleFavorite: (offer) => {
    return {
      type: ActionType.TOGGLE_FAV,
      payload: offer,
    };
  },
  setIsLoading: (status) => {
    return {
      type: ActionType.SET_IS_LOADING,
      payload: status,
    };
  },
};

// Operation это асинхронный ActionCreator
const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoading(true));

    return api.get(`/hotels`)
      .then((res) => {
        dispatch(ActionCreator.loadOffers(adapterCitiesData(res.data)));
        dispatch(ActionCreator.setIsLoading(false));
      })
      .catch(() => {
        dispatch(ActionCreator.setIsLoading(false));
        // console.log(`/hotels NON`);
        // history.push(AppRoute.MAIN_EMPTY);
      });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((res) => {
        // console.log(`COMMENTS res.data: `, res.data);
        // console.log('adapterComments: ', adapterCommentsData(res.data));
        dispatch(ActionCreator.loadComments(adapterCommentsData(res.data)));
      });
  },
  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((res) => {
        // console.log(`NEARBY res.data: `, res.data);
        // console.log('adapterNearby: ', adapterNearbyData(res.data));
        dispatch(ActionCreator.loadNearbyOffers(adapterNearbyData(res.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.LOAD_NEARBY:
      return extend(state, {
        nearbyOffers: action.payload,
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

    case ActionType.SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionCreator, ActionType};
