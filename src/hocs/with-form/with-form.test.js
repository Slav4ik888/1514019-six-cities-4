import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import withForm from './with-form.js';

import {NameSpace} from '../../reducers/name-space.js';
import {offers} from '../../mocks/offers.js';
import {testOffer, reviews, nearbyOffers} from '../../mocks/test-offer.js';


const mockStore = configureStore([]);

const MockComponent = () => <div/>;

const MockComponentWrapped = withForm(MockComponent);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


it(`Render HOC <withForm/>`, () => {
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
  const tree = renderer.create(
      <Provider store={store}>
        <MockComponentWrapped
          isDisabled={true}
          isLoading={false}
          isError={false}
          commentText={``}
          onChangeComment={() => {}}
          onChangeStars={() => {}}
          onSubmit={() => {}}
        />
      </Provider>

  ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- -u with-form.test.js
// npm test with-form.test.js
