import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import Card from './card.jsx';

import {testOffer} from '../../mocks/test-offer.js';
import {NameSpace} from '../../reducers/name-space.js';
import {offers} from '../../mocks/offers.js';


const mockStore = configureStore([]);

Enzyme.configure({adapter: new Adapter()});

describe(`<Card /> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onCardFocusEnter = jest.fn((...args) => [...args]);
  const onCardFocusLeave = jest.fn();
  const onFavClick = jest.fn();
  const isFav = false;
  const type = `NEAR`;

  const renderComponent = (props = {}) => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
      },
      [NameSpace.DATA]: {
        allOffers: offers,
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
    });
    return mount(
        <Provider store={store}>
          <BrowserRouter>
            <Card
              offer = {testOffer}
              onCardFocusEnter = {onCardFocusEnter}
              onCardFocusLeave = {onCardFocusLeave}
              onFavClick = {onFavClick}
              isFav = {isFav}
              type={type}
              {...props}
            />
          </BrowserRouter>
        </Provider>
    );
  };

  it(`Навели мышку на карточку`, () => {
    const component = renderComponent();
    const card = component.find(`article.near-places__card`);

    card.simulate(`pointerenter`);
    expect(onCardFocusEnter).toHaveBeenCalledTimes(1);
    expect(onCardFocusEnter.mock.calls[0][0]).toEqual(testOffer);

  });

  it(`Убрали мышку с карточки`, () => {
    const component = renderComponent();
    const card = component.find(`article.near-places__card`);

    card.simulate(`pointerleave`);
    expect(onCardFocusLeave).toHaveBeenCalledTimes(1);
  });

});

// npm test card.e2e.test.js
