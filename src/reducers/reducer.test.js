import {reducer, ActionType, ActionCreator} from './reducer.js';
import {offers} from '../mocks/offers.js';
import {cities} from '../utils/const.js';

describe(`Тестим Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      activeCity: 0,
      offers: offers.Paris,
    });
  });

  it(`Reducer CHANGE_CITY by a given new city`, () => {
    expect(reducer({
      activeCity: 0,
      offers: offers.Paris,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: 2,
    })).toEqual({
      activeCity: 2,
      offers: offers.Paris,
    });
  });

  it(`Reducer GET_OFFERS by a given new offer`, () => {
    expect(reducer({
      activeCity: 0,
      offers: offers.Paris,
    }, {
      type: ActionType.GET_OFFERS,
      payload: cities[2],
    })).toEqual({
      activeCity: 0,
      offers: offers.Brussels,
    });
  });

});

describe(`Тестим ActionCreator`, () => {

  it(`ActionCreator for changeCity`, () => {
    expect(ActionCreator.changeCity(2)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 2,
    });
  });

  it(`ActionCreator for getOffers`, () => {
    expect(ActionCreator.getOffers(3)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: 3,
    });
  });

});
