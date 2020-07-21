import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import {testOffer} from "../../mocks/test-offer.js";
import configureStore from 'redux-mock-store';
import {NameSpace} from '../../reducers/name-space.js';
import {Provider} from 'react-redux';


const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`<Card> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onCardTitleClick = jest.fn();
  const onCardFocusEnter = jest.fn();
  const onCardFocusLeave = jest.fn();
  const onFavClick = jest.fn();
  const isFav = false;

  const renderComponent = (props = {}) => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
      },
    });
    return shallow(
        <Provider store={store}>
          <Card offer = {testOffer}
            onCardTitleClick = {onCardTitleClick}
            onCardFocusEnter = {onCardFocusEnter}
            onCardFocusLeave = {onCardFocusLeave}
            onFavClick = {onFavClick}
            isFav = {isFav}
            {...props}
          />
        </Provider>
    );
  };

  it(`Клик по title`, () => {
    const placeComponent = renderComponent();
    const placeTitle = placeComponent.find(`h2.place-card__name a`);

    placeTitle.simulate(`click`);
    expect(onCardTitleClick).toHaveBeenCalledTimes(1);
  });

  it(`Навели мышку на карточку`, () => {
    const component = renderComponent();
    const card = component.find(`article.place-card`);

    card.simulate(`pointerenter`);
    expect(onCardFocusEnter).toHaveBeenCalledTimes(1);
  });

  it(`Убрали мышку с карточки`, () => {
    const component = renderComponent();
    const card = component.find(`article.place-card`);

    card.simulate(`pointerleave`);
    expect(onCardFocusLeave).toHaveBeenCalledTimes(1);
  });

  it(`Кликнули по флажку в избранное`, () => {
    const component = renderComponent();
    const card = component.find(`place-card__bookmark-button`);

    card.simulate(`click`);
    expect(onFavClick).toHaveBeenCalledTimes(1);
  });

});
