import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import CardList from './card-list.jsx';

import {offers} from '../../mocks/offers.js';
import {NameSpace} from '../../reducers/name-space.js';

const mockStore = configureStore([]);


describe(`Snapshot <CardList>`, () => {
  it(`Render <CardList> AUTH type={'NEAR'}`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <CardList
                type={`NEAR`}
                offers={offers.Paris}
                focusCard={offers.Paris[0]}
                onItemClick={() => {}}
                onCardFocusEnter={() => {}}
                onCardFocusLeave={() => {}}
              />
            </BrowserRouter>

          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <CardList> AUTH type={'CITY'}`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <CardList
                type={`CITY`}
                offers={offers.Paris}
                focusCard={offers.Paris[0]}
                onCardFocusEnter={() => {}}
                onCardFocusLeave={() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`Render <CardList> NO_AUTH type={'CITY'}`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <CardList
                type={`CITY`}
                offers={offers.Paris}
                focusCard={offers.Paris[0]}
                onCardFocusEnter={() => {}}
                onCardFocusLeave={() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u card-list.test.js
// npm test card-list.test.js
