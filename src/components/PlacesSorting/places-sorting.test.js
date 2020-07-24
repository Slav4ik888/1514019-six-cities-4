import React from 'react';
import renderer from 'react-test-renderer';

import PlacesSorting from './places-sorting.jsx';

const child = <div />;

describe(`Snapshot <PlacesSorting/>`, () => {
  it(`Render <PlacesSorting/>`, () => {
    const tree = renderer.create(
        <PlacesSorting>
          {child}
        </PlacesSorting>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
