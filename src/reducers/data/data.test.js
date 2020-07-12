import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, Operation} from './data.js';
import {createAPI} from '../../api.js';
import {offers} from '../../mocks/offers.js';
// import {testOffer} from '../../mocks/test-offer.js';
// import {cities} from '../utils/const.js';

const api = createAPI(() => {});


describe(`Тестим DATA Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual({
      allOffers: {},
    });
  });

  it(`Reducer LOAD_OFFERS by get from DB`, () => {
    expect(reducer({
      allOffers: {},
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      allOffers: offers,
    });
  });

});

describe(`DATA Operation work correctly`, () => {

  it(`Operation work correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotel`) // Чтобы мок на запрос `/hotel`
      .reply(200, [{fake: true}]); // вернул ответ 200 и массив таких данных [{fake: true}]

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1); // Проверяем, что dispatch был вызван
        expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});
