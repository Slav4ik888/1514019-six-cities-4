import React from 'react';
import renderer from 'react-test-renderer';
import MapCity from './map-city.jsx';
import {testOffers} from '../../mocks/test-mocks.js';


it(`check render MapCity`, () => {
  const component = renderer.create(
      <MapCity
        offers={testOffers}
      />, {
        createNodeMock: () => {}
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});
