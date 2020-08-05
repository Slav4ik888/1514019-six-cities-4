import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {Favorites} from './favorites.jsx';

import {NameSpace} from '../../reducers/name-space.js';
import {offers} from '../../mocks/offers.js';
import {testOffer} from '../../mocks/test-offer.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


describe(`Snapshot <Favorites/>`, () => {
  it(`Render <Favorites/> userStatus: 'AUTH'`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        favorites: {offers},
        allOffers: {offers},
        activeCity: 0,
        activeOffer: testOffer,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Favorites
                // userStatus={`AUTH`}
                favorites={offers}
                handleCardTitleClick={() => {}}
                offers={offers.Paris}
                // authInfo={authInfo}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Favorites/> userStatus: 'NO_AUTH'`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        favorites: {offers},
        allOffers: {offers},
        activeCity: 0,
        activeOffer: testOffer,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Favorites
                // userStatus={`NO_AUTH`}
                favorites={offers}
                handleCardTitleClick={() => {}}
                offers={offers.Paris}
                // authInfo={authInfo}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

});

// npm run test.jest -- -u favorites.test.js
// npm test favorites.test.js
