import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from './with-active-item.js';

const MockComponent = () => <div/>;

const MockComponentWrapped = withActiveItem(MockComponent);


it(`should render withActiveItem correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        activeItemId={null}
        onItemClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});