import {getActiveCity, getActiveOffer, getActivePage} from './selectors.js';

const mockState = {
  activeCity: 0,
  activeOffer: {id: 2},
  activePage: `MAIN`,
};

describe(`User reducer TRAVEL selector tests`, () => {
  it(`getActiveCity selector return correct value`, () => {
    expect(getActiveCity(mockState)).toEqual(0);
  });
  it(`getActiveOffer selector return correct value`, () => {
    expect(getActiveOffer(mockState)).toEqual({id: 2});
  });
  it(`getActivePage selector return correct value`, () => {
    expect(getActivePage(mockState)).toEqual(`MAIN`);
  });
});
