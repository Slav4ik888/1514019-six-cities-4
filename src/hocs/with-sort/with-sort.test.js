import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import pt from 'prop-types';

import withSort from './with-sort.js';
import {NameSpace} from '../../reducers/name-space.js';
import {sortType} from '../../utils/const.js';

const mockStore = configureStore([]);

const MockComponent = ({children}) => (<div> {children} </div>);

MockComponent.propTypes = {
  children: pt.oneOfType([
    pt.arrayOf(pt.node),
    pt.node
  ]).isRequired
};

const MockComponentWrapped = withSort(MockComponent);

describe(`Render <withFocusCard>`, () => {
  it(`Render <withFocusCard/> with focus`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        sortingType: sortType.POPULAR,
      }
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MockComponentWrapped
              changeSorting={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});

