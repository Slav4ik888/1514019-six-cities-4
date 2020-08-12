import React from 'react';
import renderer from 'react-test-renderer';

import PlacesSorting from './places-sorting.jsx';

const child = <div />;

describe(`Snapshot <PlacesSorting />`, () => {
  it(`Render <PlacesSorting />`, () => {
    const tree = renderer.create(
        <PlacesSorting>
          {child}
        </PlacesSorting>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});

// npm run test.jest -- -u places-sorting.test.js
// npm test places-sorting.test.js
