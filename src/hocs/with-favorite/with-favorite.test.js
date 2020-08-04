import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import withFavorite from './with-favorite.js';

import {AuthStatus} from '../../reducers/user/user.js';

import {NameSpace} from '../../reducers/name-space.js';
import {testOffer} from '../../mocks/test-offer.js';


const mockStore = configureStore([]);

const MockComp = () => <div/>;

const MockCompWrap = withFavorite(MockComp);


describe(`Snapshot <withFavorite /> correctly`, () => {
  it(`Render <withFavorite /> AuthStatus.AUTH`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: AuthStatus.AUTH,
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <MockCompWrap
            userStatus={AuthStatus.AUTH}
            offer={testOffer}
            onToggleFav={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <withFavorite /> AuthStatus.NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: AuthStatus.NO_AUTH,
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <MockCompWrap
            userStatus={AuthStatus.NO_AUTH}
            offer={testOffer}
            onToggleFav={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u with-favorite.test.js
// npm test with-favorite.test.js
