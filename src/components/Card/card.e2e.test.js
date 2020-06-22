import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import {testOffer} from "../../mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`<Card> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onCardTitleClick = jest.fn();
  const handleCardFocusEnter = jest.fn();
  const handleCardFocusLeave = jest.fn();

  const renderComponent = (props = {}) => {
    return shallow(
        <Card offer={testOffer}
          onCardTitleClick={onCardTitleClick}
          handleCardFocusEnter = {handleCardFocusEnter}
          handleCardFocusLeave = {handleCardFocusLeave}
          {...props}
        />);
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
    expect(handleCardFocusEnter).toHaveBeenCalledTimes(1);
    expect(handleCardFocusEnter).toHaveBeenCalledWith(testOffer.id);
  });

  it(`Убрали мышку с карточки`, () => {
    const component = renderComponent();
    const card = component.find(`article.place-card`);

    card.simulate(`pointerleave`);
    expect(handleCardFocusLeave).toHaveBeenCalledTimes(1);
  });

});
