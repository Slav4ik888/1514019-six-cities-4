import {reducer, Operation, ActionCreator, ActionType, AuthStatus} from './user.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';


const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};

describe(`USER Reducer work correctly`, () => {
  it(`Reducer without additional parameters should be return initiaState`, () => {
    expect(reducer(void 0, {})).toEqual({
      userStatus: AuthStatus.NO_AUTH,
      authInfo: {},
      isLoading: false,
    });
  });

  it(`Reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({userStatus: AuthStatus.NO_AUTH}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.AUTH,
    })).toEqual({userStatus: AuthStatus.AUTH});

    expect(reducer({userStatus: AuthStatus.AUTH}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.NO_AUTH,
    })).toEqual({userStatus: AuthStatus.NO_AUTH});

    expect(reducer({userStatus: AuthStatus.AUTH}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.AUTH,
    })).toEqual({userStatus: AuthStatus.AUTH});

    expect(reducer({userStatus: AuthStatus.NO_AUTH}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.NO_AUTH,
    })).toEqual({userStatus: AuthStatus.NO_AUTH});
  });

  it(`Reducer should change authInfo by a given value`, () => {
    expect(reducer({
      authInfo: {},
    }, {
      type: ActionType.AUTH_INFO,
      payload: authInfo,
    })).toEqual({
      authInfo,
    });

    expect(reducer({
      authInfo: {
        email: `korzan.va@mail.ru`,
        password: `fghjdk`,
      },
    }, {
      type: ActionType.AUTH_INFO,
      payload: authInfo,
    })).toEqual({
      authInfo: {
        avatarUrl: `/static/avatar/7.jpg`,
        email: `korzan.va@mail.ru`,
        id: 1,
        isPro: false,
        name: `Vyacheslav`,
      },
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthStatus.AUTH,
    });
  });

  it(`setActiveAuth returns correct action`, () => {
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

  it(`setIsLoading returns correct action`, () => {
    expect(ActionCreator.setIsLoading(false)).toEqual({
      type: ActionType.SET_IS_LOADING,
      payload: false,
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
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_IS_LOADING,
          payload: true});
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`});
      });
  });

  it(`Operation login returns correct action`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginInfo = {
      login: `korzan.va@mail.ru`,
      password: `fghjdk`,
    };
    const loginCheck = Operation.login(loginInfo);

    apiMock
      .onPost(`/login`)
      .reply(200, authInfo);

    return loginCheck(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`});
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.AUTH_INFO,
          payload: authInfo
          // {
          //   email: authInfo.email,
          //   password: authInfo.password,
          // }
        });
      });
  });
});

// npm test user.test.js
