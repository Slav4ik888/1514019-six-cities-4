import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const offers = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

describe(`Snapshot of <Main>`, () => {
  it(`index рендерит <Main> offers ${offers}`, () => {
    const tree = renderer
      .create(
          <Main
            offers={offers}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
