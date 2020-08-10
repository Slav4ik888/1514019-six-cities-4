import React from 'react';
import renderer from 'react-test-renderer';

import MainEmpty from './main-empty.jsx';

describe(`Snapshot <MainEmpty/>`, () => {
  it(`Render <MainEmpty/> correctly`, () => {
    const tree = renderer.create(
        <MainEmpty activeCity={0}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u main-empty.test.js
// npm test main-empty.test.js
