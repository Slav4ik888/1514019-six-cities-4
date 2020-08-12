import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ButtonFavorite from './button-favorite.jsx';

import {testOffer} from '../../mocks/test-offer.js';
import {placesType} from '../../utils/const.js';


Enzyme.configure({adapter: new Adapter()});

describe(`<ButtonFavorite /> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onFavClick = jest.fn();

  it(`Клик по placesType.CITY`, () => {
    const isFav = false;

    const сomponent = shallow(
        <ButtonFavorite
          offer={testOffer}
          isFav={isFav}
          onFavClick={onFavClick}
          type = {placesType.CITY}
        />
    );

    сomponent
      .find(`button`)
      .simulate(`click`);

    expect(onFavClick).toHaveBeenCalledTimes(1);
  });

  it(`Клик по placesType.OFFER_DETAILS`, () => {
    const isFav = false;

    const сomponent = shallow(
        <ButtonFavorite
          offer={testOffer}
          isFav={isFav}
          onFavClick={onFavClick}
          type = {placesType.OFFER_DETAILS}
        />
    );

    сomponent
      .find(`button`)
      .simulate(`click`);

    expect(onFavClick).toHaveBeenCalledTimes(1);
  });
});

// npm test button-favorite.e2e.test.js
