import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

describe(`Snapshot of <SignIn>`, () => {
  it(`Render <SignIn>`, () => {
    const tree = renderer
      .create(
          <SignIn
            activeCity={0}
            onSubmit={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
