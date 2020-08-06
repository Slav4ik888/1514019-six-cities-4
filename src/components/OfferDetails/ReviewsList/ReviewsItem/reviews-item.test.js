import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsItem from './reviews-item.jsx';

import {reviews} from '../../../../mocks/test-offer.js';


it(`Render Snapshot <ReviewsItem/>`, () => {
  const tree = renderer.create(
      <ReviewsItem
        review={reviews[0]}
      />

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- -u reviews-item.test.js
// npm test reviews-item.test.js
