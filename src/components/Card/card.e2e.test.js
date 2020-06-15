import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
];

describe(`<Card> Component`, () => {
  it(`Отдаёт колбек обратно по нажатию кнопки`, () => {
    const cardTitleClick = jest.fn();

    const component = shallow(
        <Card
          offerTitle={offerTitles[0]}
          onCardTitleClick={cardTitleClick}
        />
    );

    const cardTitle = component.find(`place-card__name`);
    cardTitle.props().onClick();

    expect(cardTitleClick.mock.calls.length).toBe(1);
  });
});
