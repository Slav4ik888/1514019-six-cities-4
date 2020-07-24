import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {App} from './app.jsx';

import {NameSpace} from '../../reducers/name-space.js';
import {testOffer} from '../../mocks/test-offer.js';
import {offers} from '../../mocks/offers.js';

const mockStore = configureStore([]);


describe(`Snapshot <App/>`, () => {
  it(`Render <App/> без activeOffer`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: null,
      },
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo: {},
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              login={() => {}}
              activeCity={0}
              activeOffer={null}
              isLoading={false}
            />
          </Provider>
          // , {
          //   createNodeMock: () => {
          //     return {};
          //   }
          // }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App/> с activeOffer`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: testOffer,
      },
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo: {},
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              login={() => {}}
              activeCity={0}
              activeOffer={testOffer}
              isLoading={false}
            />
          </Provider>
          // , {
          //   createNodeMock: () => {
          //     return {};
          //   }
          // }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
