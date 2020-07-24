import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import Header from './header.jsx';

import {NameSpace} from '../../reducers/name-space.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};

describe(`Snapshot <Header/> correctly`, () => {
  it(`Render <Header/> correctly with autorization`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Header
              authStatus={`NO_AUTH`}
              authInfo={authInfo}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Header/> correctly without autorization`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo
      }
    });
    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Header
              authStatus={`AUTH`}
              authInfo={authInfo}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
