import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {OfferDetails} from './offer-details.jsx';

import {NameSpace} from '../../reducers/name-space.js';
import {offers} from '../../mocks/offers.js';
import {testOffer, reviews, nearbyOffers} from '../../mocks/test-offer.js';

const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};

const dataReview = {
  comment: `Очень хороший отель`,
  rating: 4,
};

describe(`Snapshot of <OfferDetails/>`, () => {
  it(`Render <OfferDetails/> NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: testOffer,
        activeHoverOffer: null,
      },
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: reviews,
        nearbyOffers,
        isLoading: false,
        review: {
          comment: ``,
          rating: null,
        },
        isError: false,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <OfferDetails
                userStatus={`NO_AUTH`}
                activeOffer={testOffer}
                nearbyOffers={nearbyOffers}
                activeCity={0}
                reviews={reviews}
                handleCardTitleClick={() => {}}
                dataReview={dataReview}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render <OfferDetails/> AUTH`, () => {
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
        review: {
          comment: ``,
          rating: null,
        },
        isError: false,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <OfferDetails
                userStatus={`AUTH`}
                activeOffer={testOffer}
                nearbyOffers={nearbyOffers}
                activeCity={0}
                reviews={reviews}
                handleCardTitleClick={() => {}}
                dataReview={dataReview}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
