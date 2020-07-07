import React from 'react';
import renderer from 'react-test-renderer';
import CardList from './card-list.jsx';
import {offers} from "../../mocks/offers.js";

describe(`Snapshot of <CardList>`, () => {
  it(`Render <CardList>`, () => {
    const tree = renderer
      .create(
          <CardList
            offers={offers.Paris}
            onItemClick={() => {}}
            focusCard={offers.Paris[0]}
            onCardFocusEnter={() => {}}
            onCardFocusLeave={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
