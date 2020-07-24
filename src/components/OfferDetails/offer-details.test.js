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


describe(`Snapshot of <OfferDetails/>`, () => {
  it(`Render <OfferDetails/>`, () => {
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

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <OfferDetails
                activeOffer={testOffer}
                nearbyOffers={nearbyOffers}
                activeCity={0}
                reviews={reviews}
                handleCardTitleClick={() => {}}
              />
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
