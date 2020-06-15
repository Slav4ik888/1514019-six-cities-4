import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offers = [`Offer1`, `Offer2`];

describe(`index рендерит <App /> `, () => {
  it(`index рендерит <App /> `, () => {
    const tree = renderer
      .create(<App offers={offers} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
