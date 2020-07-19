import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NameSpace} from '../../reducers/name-space.js';
import {offers} from "../../mocks/offers.js";

const mockStore = configureStore([]);


describe(`Render <App /> `, () => {
  it(`Render <App /> без оффера`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              userStatus={`NO_AUTH`}
              authInfo={{}}
              login={() => {}}
              allOffers={offers}
              activeCity={0}
              handleChangeCity={() => {}}
              activeOffer={null}
              handleCardTitleClick={() => {}}
            />
          </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App /> с оффером`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `AUTH`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              userStatus={`AUTH`}
              authInfo={{}}
              login={() => {}}
              allOffers={offers}
              activeCity={0}
              handleChangeCity={() => {}}
              activeOffer={offers.Paris[0]}
              handleCardTitleClick={() => {}}
            />
          </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Render <App /> с SignIn`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        userStatus: `NO_AUTH`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              userStatus={`NO_AUTH`}
              authInfo={{}}
              login={() => {}}
              allOffers={offers}
              activeCity={0}
              handleChangeCity={() => {}}
              activeOffer={null}
              handleCardTitleClick={() => {}}
            />
          </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
