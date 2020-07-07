import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {offers} from "../../mocks/offers.js";


describe(`Snapshot of <Main>`, () => {
  it(`Render <Main>`, () => {
    const tree = renderer
      .create(
          <Main
            offers={offers.Paris}
            onCardTitleClick={() => {}}
            activeCity={0}
            onChangeCity={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
