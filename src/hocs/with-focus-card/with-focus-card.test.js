import React from 'react';
import renderer from 'react-test-renderer';
import withFocusCard from './with-focus-card.js';

const MockComponent = () => <div/>;

const MockComponentWrapped = withFocusCard(MockComponent);

it(`withFocusCard is rendered correctly`, () => {

  const tree = renderer.create(
      <MockComponentWrapped
        focusCard={null}
        onCardFocusEnter={() => {}}
        onCardFocusLeave={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

