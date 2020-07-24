import React from 'react';
import renderer from 'react-test-renderer';

import MainEmpty from './main-empty.jsx';

describe(`Snapshot <MainEmpty/>`, () => {
  it(`Render <MainEmpty/> correctly`, () => {
    const tree = renderer.create(
        <MainEmpty/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
