import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card.jsx';

import {testOffer} from '../../mocks/test-offer.js';

describe(`Snapshot of <Card>`, () => {
  it(`Render <Card>`, () => {
    const tree = renderer
      .create(
          <Card
            offer={testOffer}
            onCardTitleClick={() => {}}
            focusCard={{}}
            onCardFocusEnter = {() => {}}
            onCardFocusLeave = {() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
