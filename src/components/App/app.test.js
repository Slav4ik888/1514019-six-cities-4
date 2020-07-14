import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

import {offers} from "../../mocks/offers.js";


describe(`Render <App /> `, () => {
  it(`Render <App /> без оффера`, () => {
    const tree = renderer
      .create(<App
        userStatus={`NO_AUTH`}
        authInfo={{}}
        login={() => {}}
        activePage={`MAIN`}
        allOffers={offers}
        activeCity={0}
        handleChangeCity={() => {}}
        activeOffer={null}
        handleCardTitleClick={() => {}}
        handleChangePage={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App /> с оффером`, () => {
    const tree = renderer
      .create(<App
        userStatus={`AUTH`}
        authInfo={{}}
        login={() => {}}
        activePage={`OFFER_DETAILS`}
        allOffers={offers}
        activeCity={0}
        handleChangeCity={() => {}}
        activeOffer={offers.Paris[0]}
        handleCardTitleClick={() => {}}
        handleChangePage={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App /> с SignIn`, () => {
    const tree = renderer
      .create(<App
        userStatus={`NO_AUTH`}
        authInfo={{}}
        login={() => {}}
        activePage={`SIGN_IN`}
        allOffers={offers}
        activeCity={0}
        handleChangeCity={() => {}}
        activeOffer={null}
        handleCardTitleClick={() => {}}
        handleChangePage={() => {}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
