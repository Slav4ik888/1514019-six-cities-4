import React from 'react';
import renderer from 'react-test-renderer';
import MapCity from './map-city.jsx';


it(`Render Snapshot <MapCity/>`, () => {
  const component = renderer.create(
      <MapCity>
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
