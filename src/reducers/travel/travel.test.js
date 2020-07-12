import {reducer, ActionType, ActionCreator} from './travel.js';
import {testOffer} from '../../mocks/test-offer.js';
// import {cities} from '../utils/const.js';


describe(`Тестим TRAVEL Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      activeCity: 0,
      activeOffer: null,
    });
  });

  it(`Reducer CHANGE_CITY by a given new city`, () => {
    expect(reducer({
      activeCity: 0,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: 2,
    })).toEqual({
      activeCity: 2,
    });
  });

  // it(`Reducer SET_OFFERS by a given new offer`, () => {
  //   expect(reducer({
  //     activeCity: 0,
  //     offers: offers.Paris,
  //   }, {
  //     type: ActionType.SET_OFFERS,
  //     payload: 2,
  //   })).toEqual({
  //     activeCity: 0,
  //     offers: offers.Brussels,
  //   });
  // });

  it(`Reducer SET_ACTIVE_ID by a given new offer`, () => {
    expect(reducer({
      activeCity: 0,
      activeOffer: null,
    }, {
      type: ActionType.SET_ACTIVE_ID,
      payload: testOffer,
    })).toEqual({
      activeCity: 0,
      activeOffer: testOffer,
    });
  });

});

describe(`Тестим TRAVEL ActionCreator`, () => {

  it(`ActionCreator for changeCity`, () => {
    expect(ActionCreator.changeCity(2)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 2,
    });
  });

  // it(`ActionCreator for setOffers`, () => {
  //   expect(ActionCreator.setOffers(3)).toEqual({
  //     type: ActionType.SET_OFFERS,
  //     payload: 3,
  //   });
  // });

  it(`ActionCreator for setActiveOffer`, () => {
    expect(ActionCreator.setActiveOffer(testOffer)).toEqual({
      type: ActionType.SET_ACTIVE_ID,
      payload: testOffer,
    });
  });

});
