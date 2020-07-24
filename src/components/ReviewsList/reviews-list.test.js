import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsList} from './reviews-list.jsx';

import {reviews} from '../../mocks/test-offer.js';


describe(`Snapshot <ReviewsList/>`, () => {

  it(`Render <ReviewsList/>`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews={reviews}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <ReviewsList/> reviews = empty`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews={[]}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

