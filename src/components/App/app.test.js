import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

import {testOffers} from "../../mocks/test-mocks.js";


describe(`index рендерит <App /> `, () => {
  it(`Render <App /> `, () => {
    const tree = renderer
      .create(<App
        offers={testOffers}
        activeCity={0}
        handleChangeCity={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
