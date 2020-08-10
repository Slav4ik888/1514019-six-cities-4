import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import withFocusCard from './with-focus-card.js';
import {NameSpace} from '../../reducers/name-space.js';
import {testOffer} from '../../mocks/test-offer.js';

const mockStore = configureStore([]);

const MockComponent = () => <div/>;

const MockComponentWrapped = withFocusCard(MockComponent);

describe(`Render withFocusCard correctly`, () => {
  it(`Render withFocusCard correctly with focus`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeHoverOffer: null,
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <MockComponentWrapped
            onCardFocusEnter={() => (null)}
            onCardFocusLeave={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render withFocusCard correctly without focus`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeHoverOffer: null,
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <MockComponentWrapped
            onCardFocusEnter={() => (testOffer)}
            onCardFocusLeave={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u with-focus-card.test.js
// npm test with-focus-card.test.js
