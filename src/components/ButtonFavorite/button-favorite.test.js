import React from 'react';
import renderer from 'react-test-renderer';

import ButtonFavorite from './button-favorite.jsx';

import {testOffer} from '../../mocks/test-offer.js';
import {placesType} from '../../utils/const.js';


describe(`Snapshot <ButtonFavorite />`, () => {
  it(`Render <ButtonFavorite / placesType.CITY> `, () => {
    const tree = renderer
      .create(
          <ButtonFavorite
            offer={testOffer}
            isFav={true}
            onFavClick={() => {}}
            type = {placesType.CITY}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`Render <ButtonFavorite /> placesType.OFFER_DETAILS`, () => {
    const tree = renderer
      .create(
          <ButtonFavorite
            offer={testOffer}
            isFav={true}
            onFavClick={() => {}}
            type = {placesType.OFFER_DETAILS}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u button-favorite.test.js
// npm test button-favorite.test.js
