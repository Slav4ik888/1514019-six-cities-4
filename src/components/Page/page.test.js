import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import Page from './page.jsx';

import {NameSpace} from '../../reducers/name-space.js';
import {offers} from '../../mocks/offers.js';
import {testOffer, reviews, nearbyOffers} from '../../mocks/test-offer.js';


const mockStore = configureStore([]);

const children = <div/>;

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


describe(`Snapshot <Page/> correctly`, () => {
  it(`Render <Page/> tyep 'MAIN'`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: testOffer,
        activeHoverOffer: null,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: reviews,
        nearbyOffers,
        isLoading: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Page
              type={`MAIN`}
            >
              {children}
            </Page>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Page/> type 'SIGN_IN'`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: testOffer,
        activeHoverOffer: null,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: reviews,
        nearbyOffers,
        isLoading: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Page
              type={`SIGN_IN`}
            >
              {children}
            </Page>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Page/> type 'FAVORITES_EMPTY'`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: testOffer,
        activeHoverOffer: null,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: reviews,
        nearbyOffers,
        isLoading: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Page
              type={`FAVORITES_EMPTY`}
            >
              {children}
            </Page>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
