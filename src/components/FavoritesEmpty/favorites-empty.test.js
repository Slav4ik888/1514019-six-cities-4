import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import FavoritesEmpty from './favorites-empty.jsx';

import {NameSpace} from '../../reducers/name-space.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


it(`Render Snapshot <FavoritesEmpty /> NO_AUTH`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      userStatus: `NO_AUTH`,
      authInfo: {},
    },
  });
  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesEmpty />
        </BrowserRouter>
      </Provider>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Snapshot <FavoritesEmpty /> AUTH`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      userStatus: `AUTH`,
      authInfo,
    },
  });
  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesEmpty />
        </BrowserRouter>
      </Provider>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- -u favorites-empty.test.js
// npm test favorites-empty.test.js
