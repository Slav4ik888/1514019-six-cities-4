import React from 'react';
import renderer from 'react-test-renderer';
import Maps from './maps.jsx';
import {pageType} from '../../utils/const.js';
import {coordsCities} from '../../utils/const.js';
import {offers} from '../../mocks/offers.js';
import {testOffer} from '../../mocks/test-offer.js';


it(`Render Snapshot <Maps/> pageType.MAIN`, () => {
  const component = renderer.create(
      <Maps
        type={pageType.MAIN}
        offers={offers.Paris}
        activeOffer={testOffer}
        activeCoords={coordsCities[0]}
      />
      , {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});

it(`Render Snapshot <Maps/> pageType.OFFER`, () => {
  const component = renderer.create(
      <Maps
        type={pageType.OFFER}
        offers={offers.Paris}
        activeOffer={testOffer}
        activeCoords={coordsCities[0]}
      />
      , {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});

// npm run test.jest -- -u maps.test.js
// npm test maps.test.js
