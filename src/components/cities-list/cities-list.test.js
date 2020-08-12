import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import CitiesList from './cities-list.jsx';


describe(`Snapshot <CitiesList/>`, () => {
  it(`Render <CitiesList/>`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <CitiesList
              activeCity={0}
              onItemClick={() =>{}}
            />
          </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u card-list.test.js
// npm test card-list.test.js
