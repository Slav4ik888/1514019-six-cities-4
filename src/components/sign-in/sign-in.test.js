import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in.jsx';

import {NameSpace} from '../../reducers/name-space.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


describe(`Snapshot <SignIn/>`, () => {
  it(`Render <SignIn/> userStatus: NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <SignIn
                onSubmit={() => {}}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <SignIn/> userStatus:AUTH`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <SignIn
                onSubmit={() => {}}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u sign-in.test.js
// npm test sign-in.test.js
