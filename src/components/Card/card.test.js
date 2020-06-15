import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card.jsx';

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

const cardTitleHandler = () => {};

describe(`<Main /> рендерит <Card>`, () => {
  it(`<Card> со offers ${offerTitles[0]}`, () => {
    const tree = renderer
      .create(<Card
        offerTitle={offerTitles[0]}
        onCardTitleClick={cardTitleHandler}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
