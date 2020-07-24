import {getAllOffers} from './selectors.js';
import {offers} from '../../mocks/offers.js';

const mockState = {
  allOffers: offers,
};

describe(`User reducer DATA selector tests`, () => {
  it(`getAllOffers selector return correct value`, () => {
    expect(getAllOffers(mockState)).toEqual(offers);
  });
});
