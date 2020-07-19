import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {NameSpace} from '../../reducers/name-space.js';
import {BrowserRouter} from 'react-router-dom';

const mockStore = configureStore([]);

describe(`Snapshot of <SignIn>`, () => {
  it(`Render <SignIn>`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <SignIn
              activeCity={0}
              onSubmit={() => {}}
            />
            <BrowserRouter>
              <SignIn
                activeCity={0}
                onSubmit={() => {}}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
