import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

import {offers} from "../../mocks/offers.js";


describe(`Render <App /> `, () => {
  it(`Render <App /> без оффера`, () => {
    const tree = renderer
      .create(<App
        allOffers={offers}
        activeCity={0}
        handleChangeCity={() => {}}
        activeOffer={null}
        handleCardTitleClick={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App /> с оффером`, () => {
    const tree = renderer
      .create(<App
        allOffers={offers}
        activeCity={0}
        handleChangeCity={() => {}}
        activeOffer={offers.Paris[0]}
        handleCardTitleClick={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
