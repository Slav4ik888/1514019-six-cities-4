import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {Card} from './card.jsx';

import {NameSpace} from '../../reducers/name-space.js';
import {testOffer} from '../../mocks/test-offer.js';
import {offers} from '../../mocks/offers.js';


const mockStore = configureStore([]);


describe(`Snapshot <Card>`, () => {
  it(`Render <Card> type='CITY' isFav=true`, () => {
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
              <Card
                offer={testOffer}
                focusCard={{}}
                loadReviews={() => {}}
                loadNearbies={() => {}}
                onFavClick={() => {}}
                type={`CITY`}
                isFav={true}
                onCardTitleClick={() => {}}
                onCardFocusEnter = {() => {}}
                onCardFocusLeave = {() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Card> type='CITY' isFav=false`, () => {
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
              <Card
                offer={testOffer}
                focusCard={{}}
                loadReviews={() => {}}
                loadNearbies={() => {}}
                onFavClick={() => {}}
                type={`CITY`}
                isFav={false}
                onCardTitleClick={() => {}}
                onCardFocusEnter = {() => {}}
                onCardFocusLeave = {() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Card> type='NEAR' isFav=true`, () => {
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
              <Card
                offer={testOffer}
                focusCard={{}}
                loadReviews={() => {}}
                loadNearbies={() => {}}
                onFavClick={() => {}}
                type={`NEAR`}
                isFav={true}
                onCardTitleClick={() => {}}
                onCardFocusEnter = {() => {}}
                onCardFocusLeave = {() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <Card> type='NEAR' isFav=false`, () => {
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
              <Card
                offer={testOffer}
                focusCard={{}}
                loadReviews={() => {}}
                loadNearbies={() => {}}
                onFavClick={() => {}}
                type={`NEAR`}
                isFav={false}
                onCardTitleClick={() => {}}
                onCardFocusEnter = {() => {}}
                onCardFocusLeave = {() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
