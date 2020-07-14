import {reducer, Operation, ActionCreator, ActionType, AuthorizationStatus} from './user.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

it(`USER Reducer without additional parameters should be return initiaState`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authInfo: {},
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change authInfo by a given value`, () => {
  expect(reducer({
    authInfo: {},
  }, {
    type: ActionType.AUTH_INFO,
    payload: {
      email: `korzan.va@mail.ru`,
      password: `fghjdk`,
    },
  })).toEqual({
    authInfo: {
      email: `korzan.va@mail.ru`,
      password: `fghjdk`,
    },
  });

  expect(reducer({
    authInfo: {
      email: `korzan.va@mail.ru`,
      password: `fghjdk`,
    },
  }, {
    type: ActionType.AUTH_INFO,
    payload: {},
  })).toEqual({
    authInfo: {},
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for setActiveAuth returns correct action`, () => {
    expect(ActionCreator.setActiveAuth({
      email: `korzan.va@mail.ru`,
      password: `fghjdk`,
    })).toEqual({
      type: ActionType.AUTH_INFO,
      payload: {
        email: `korzan.va@mail.ru`,
        password: `fghjdk`,
      },
    });

    expect(ActionCreator.setActiveAuth({})).toEqual({
      type: ActionType.AUTH_INFO,
      payload: {},
    });
  });
});

const api = createAPI(() => {});

describe(`USER Operation work correctly`, () => {
  it(`Operation checkAuth returns correct action`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`) // Чтобы мок на запрос `/login`
      .reply(200, {}); // вернул ответ 200 и объект {}

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`});
      });
  });

  it(`Operation login returns correct action`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.login();

    apiMock
      .onPost(`/login`)
      .reply(200, {
        email: `korzan.va@mail.ru`,
        password: `fghjdk`,
      });

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`});
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.AUTH_INFO,
          payload: {
            email: `korzan.va@mail.ru`,
            password: `fghjdk`,
          }});
      });
  });
});
