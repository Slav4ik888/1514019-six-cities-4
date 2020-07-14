import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {offers} from "../../mocks/offers.js";


describe(`Snapshot of <Main>`, () => {
  it(`Render <Main>`, () => {
    const tree = renderer
      .create(
          <Main
            userStatus={`NO_AUTH`}
            authInfo={{}}
            offers={offers.Paris}
            onCardTitleClick={() => {}}
            activeCity={0}
            onChangeCity={() => {}}
            onChangePage={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
