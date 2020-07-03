import React from 'react';
import renderer from 'react-test-renderer';
import CardList from './card-list.jsx';
import {testOffers} from "../../mocks/test-mocks.js";

describe(`Snapshot of <CardList>`, () => {
  it(`Render <CardList>`, () => {
    const tree = renderer
      .create(
          <CardList
            offers={testOffers}
            onCardTitleClick={() => {}}
            focusCard={testOffers[0]}
            onCardFocusEnter={() => {}}
            onCardFocusLeave={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
