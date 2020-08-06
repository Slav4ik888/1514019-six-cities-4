import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import Main from './main.jsx';

import {NameSpace} from '../../reducers/name-space.js';
// import {offers} from "../../mocks/offers.js";
import {testOffer} from '../../mocks/test-offer.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};


describe(`Snapshot of <Main/>`, () => {
  // it(`Render <Main/> with offers`, () => {
  //   const store = mockStore({
  //     [NameSpace.TRAVEL]: {
  //       activeCity: 0,
  //       activeOffer: null,
  //       activeHoverOffer: testOffer,
  //     },
  //     [NameSpace.USER]: {
  //       userStatus: `AUTH`,
  //       authInfo,
  //       isLoading: false,
  //     },
  //     [NameSpace.DATA]: {
  //       allOffers: offers,
  //       comments: [],
  //       nearbyOffers: [],
  //       isLoading: false,
  //     },
  //   });

  //   const tree = renderer
  //     .create(
  //         <Provider store={store}>
  //           <BrowserRouter>
  //             <Main
  //               isLoading={false}
  //               offers={offers.Paris}
  //               activeCity={0}
  //               activeHoverOffer={testOffer}
  //               handleCardTitleClick={() => {}}
  //               handleChangeCity={() => {}}
  //             />
  //           </BrowserRouter>
  //         </Provider>, {
  //           createNodeMock: () => {
  //             return {};
  //           }
  //         }
  //     ).toJSON();

  //   expect(tree).toMatchSnapshot();
  // });

  it(`Render <Main/> with offers=[]`, () => {
    const store = mockStore({
      [NameSpace.TRAVEL]: {
        activeCity: 0,
        activeOffer: null,
        activeHoverOffer: testOffer,
      },
      [NameSpace.USER]: {
        userStatus: `AUTH`,
        authInfo,
        isLoading: false,
      },
      [NameSpace.DATA]: {
        allOffers: [],
        comments: [],
        nearbyOffers: [],
        isLoading: false,
      },
      handleCardTitleClick: () => {},
      handleChangeCity: () => {},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Main
                isLoading={false}
                offers={[]}
                activeCity={0}
                activeHoverOffer={testOffer}
                handleCardTitleClick={() => {}}
                handleChangeCity={() => {}}
              />
            </BrowserRouter>
          </Provider>
          , {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- -u main.test.js
// npm test main.test.js
