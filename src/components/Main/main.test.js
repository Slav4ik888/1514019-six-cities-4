import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {testOffers} from "../../mocks/test-mocks.js";

describe(`Snapshot of <Main>`, () => {
  it(`Render <Main>`, () => {
    const tree = renderer
      .create(
          <Main
            offers={testOffers}
            onCardTitleClick={() => {}}
            activeCity={0}
            onChangeCity={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
