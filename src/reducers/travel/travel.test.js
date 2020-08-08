import {reducer, ActionType, ActionCreator} from './travel.js';
import {testOffer} from '../../mocks/test-offer.js';
// import {cities} from '../utils/const.js';
import {sortType} from '../../utils/const.js';


describe(`Тестим TRAVEL Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      activeCity: 0,
      activeOffer: null,
      activeHoverOffer: null,
      sortingType: sortType.POPULAR,
    });
  });

  it(`CHANGE_CITY by a given new city`, () => {
    expect(reducer({
      activeCity: 0,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: 2,
    })).toEqual({
      activeCity: 2,
    });
  });

  it(`SET_ACTIVE_OFFER by a given new offer`, () => {
    expect(reducer({
      activeOffer: null,
    }, {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: testOffer,
    })).toEqual({
      activeOffer: testOffer,
    });
  });

  it(`SET_ACTIVE_HOVER_OFFER by a given new offer`, () => {
    expect(reducer({
      activeHoverOffer: null,
    }, {
      type: ActionType.SET_ACTIVE_HOVER_OFFER,
      payload: testOffer,
    })).toEqual({
      activeHoverOffer: testOffer,
    });
  });

  it(`SET_SORTING by a given type `, () => {
    expect(reducer({
      sortingType: sortType.POPULAR,
    }, {
      type: ActionType.SET_SORTING,
      payload: sortType.RATING,
    })).toEqual({
      sortingType: sortType.RATING,
    });
  });

});

describe(`Action creators work correctly`, () => {

  it(`changeCity`, () => {
    expect(ActionCreator.changeCity(2)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 2,
    });
  });

  it(`setActiveOffer`, () => {
    expect(ActionCreator.setActiveOffer(testOffer)).toEqual({
      type: ActionType.SET_ACTIVE_OFFER,
      payload: testOffer,
    });
  });

  it(`setActiveHoverOffer`, () => {
    expect(ActionCreator.setActiveHoverOffer(testOffer)).toEqual({
      type: ActionType.SET_ACTIVE_HOVER_OFFER,
      payload: testOffer,
    });
  });

  it(`setSorting with false`, () => {
    expect(ActionCreator.setSorting(false)).toEqual({
      type: ActionType.SET_SORTING,
      payload: sortType.POPULAR,
    });
  });

  it(`setSorting with `, () => {
    expect(ActionCreator.setSorting(sortType.RATING)).toEqual({
      type: ActionType.SET_SORTING,
      payload: sortType.RATING,
    });
  });
});

// npm test travel.test.js
