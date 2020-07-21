import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';


describe(`Snapshot of <CitiesList>`, () => {
  it(`Render <CitiesList>`, () => {
    const tree = renderer
      .create(
          <CitiesList
            activeCity={0}
            onItemClick={() =>{}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
