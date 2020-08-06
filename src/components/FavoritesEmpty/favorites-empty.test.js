import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FavoritesEmpty from './favorites-empty.jsx';


it(`Render Snapshot <FavoritesEmpty />`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <FavoritesEmpty />
      </BrowserRouter>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- -u favorites.test.js
// npm test favorites.test.js
