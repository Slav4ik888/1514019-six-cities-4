import React from 'react';
import renderer from 'react-test-renderer';
import pt from 'prop-types';
import withMap from './with-map.js';
import {coordsCities} from '../../utils/const.js';
import {offers} from '../../mocks/offers.js';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: pt.oneOfType([
    pt.arrayOf(pt.node),
    pt.node
  ]).isRequired
};

const MockComponentWrapped = withMap(MockComponent);

it(`Render withMap is rendered correctly`, () => {

  const tree = renderer
    .create(
        <MockComponentWrapped
          offers={offers.Paris}
          activeCoords={coordsCities[0]}
        />
        , {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

