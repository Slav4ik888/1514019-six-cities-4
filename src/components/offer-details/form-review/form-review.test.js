import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import FormReview from './form-review.jsx';

describe(`Snapshot <FormReview/>`, () => {
  it(`Render <FormReview/>`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <FormReview
            isDisabled={true}
            isLoading={false}
            isError={false}
            commentText={``}
            onChangeComment={() => {}}
            onChangeStars={() => {}}
            onSubmit={() => {}}
          />
        </BrowserRouter>

    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u form-review.test.js
// npm test form-review.test.js
