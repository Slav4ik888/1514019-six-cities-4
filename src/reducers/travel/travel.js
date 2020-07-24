import {extend} from '../../utils/utils.js';
import {sortType} from '../../utils/const.js';


const initialState = {
  activeCity: 0, // № города
  activeOffer: null, // Один Offer который нажали
  activeHoverOffer: null, // Offer на который навели мышь
  sortingType: sortType.POPULAR, // Установленный тип сортировки
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  SET_ACTIVE_HOVER_OFFER: `SET_ACTIVE_HOVER_OFFER`,
  SET_SORTING: `SET_SORTING`,
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

  setActiveHoverOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_HOVER_OFFER,
    payload: offer,
  }),

  setSorting: (type) => ({
    type: ActionType.SET_SORTING,
    payload: type ? type : sortType.POPULAR,
  })
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

    case ActionType.SET_ACTIVE_HOVER_OFFER:
      return extend(state, {
        activeHoverOffer: action.payload,
      });

    case ActionType.SET_SORTING:
      return extend(state, {
        sortingType: action.payload,
      });

  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
