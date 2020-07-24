import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import CardList from './card-list.jsx';

import {offers} from "../../mocks/offers.js";
import {NameSpace} from '../../reducers/name-space.js';

const mockStore = configureStore([]);


describe(`Snapshot <CardList>`, () => {
  it(`Render <CardList> type={'NEAR'}`, () => {
    const store = mockStore({
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

  it(`Render <CardList> type={'CITY'}`, () => {
    const store = mockStore({
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
            <BrowserRouter>
              <CardList
                type={`CITY`}
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
});
