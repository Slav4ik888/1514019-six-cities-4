import React from 'react';
import renderer from 'react-test-renderer';
import MapCity from './map-city.jsx';
import {pageType} from '../../utils/const.js';


it(`Render Snapshot <MapCity/> pageType.MAIN`, () => {
  const component = renderer.create(
      <MapCity type={pageType.MAIN}>
        <div/>
      </MapCity>
      , {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});

it(`Render Snapshot <MapCity/> pageType.OFFER`, () => {
  const component = renderer.create(
      <MapCity type={pageType.OFFER}>
        <div/>
      </MapCity>
      , {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});
