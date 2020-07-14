import {reducer, ActionType, ActionCreator} from './travel.js';
import {testOffer} from '../../mocks/test-offer.js';
// import {cities} from '../utils/const.js';
import {pages} from '../utils/const.js';


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

  it(`Reducer SET_ACTIVE_OFFER by a given new offer`, () => {
    expect(reducer({
      activeCity: 0,
      activeOffer: null,
    }, {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: testOffer,
    })).toEqual({
      activeCity: 0,
      activeOffer: testOffer,
    });
  });

  it(`Reducer SET_ACTIVE_PAGE by a given new page`, () => {
    expect(reducer({
      activePage: pages.MAIN,
    }, {
      type: ActionType.SET_ACTIVE_PAGE,
      payload: pages.SIGN_IN,
    })).toEqual({
      activePage: pages.SIGN_IN,
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

  it(`ActionCreator for setActiveOffer`, () => {
    expect(ActionCreator.setActiveOffer(testOffer)).toEqual({
      type: ActionType.SET_ACTIVE_OFFER,
      payload: testOffer,
    });
  });

  it(`ActionCreator for setOffers`, () => {
    expect(ActionCreator.setActivePage(pages.SIGN_IN)).toEqual({
      type: ActionType.SET_ACTIVE_PAGE,
      payload: `SIGN_IN`,
    });
  });


});
