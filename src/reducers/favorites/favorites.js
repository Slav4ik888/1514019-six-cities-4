import {extend} from '../../utils/utils.js';

const initialState = {
  favorites: [],
};

const ActionType = {
  GET_FAVORITES: `GET_FAVORITES`
};

const ActionCreator = {
  getFavorites: (favorites) => {
    return {
      type: ActionType.GET_FAVORITES,
      payload: favorites,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITES:
      return extend(state, {
        favorites: action.payload
      });

  }
  return state;
};

const Operation = {
  toggleFavorite: ({hotelId, status}) => (dispatch, getState, api) => {
    return api.post(`/favorite/${hotelId}/${+status}`)
      .then((res) => {
        dispatch(Operation.loadFavorites());
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((res) => {
        dispatch(ActionCreator.getFavorites(res.data));
        // console.log('res.data: ', res.data);
      })
      .catch((err) => {

        throw err;
      });
  }
};

export {reducer, ActionType, ActionCreator, Operation};
