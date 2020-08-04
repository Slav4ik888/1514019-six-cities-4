import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {SignIn} from './sign-in.jsx';

import {NameSpace} from '../../reducers/name-space.js';


const mockStore = configureStore([]);


describe(`Snapshot <SignIn/>`, () => {
  it(`Render <SignIn/>`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
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
