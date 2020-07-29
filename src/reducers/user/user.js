const AuthStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  userStatus: AuthStatus.NO_AUTH,
  authInfo: {},
  isLoading: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTH_INFO: `AUTH_INFO`,
  SET_IS_LOADING: `SET_IS_LOADING`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setActiveAuth: (data) => {
    return {
      type: ActionType.AUTH_INFO,
      payload: data,
    };
  },
  setIsLoading: (status) => {
    return {
      type: ActionType.SET_IS_LOADING,
      payload: status,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoading(true));
    return api.get(`/login`)
      .then((res) => {
        dispatch(ActionCreator.requireAuthorization(AuthStatus.AUTH));
        dispatch(ActionCreator.setActiveAuth(res.data));
        dispatch(ActionCreator.setIsLoading(false));
        console.log('USER  get /login: ', res.data);
      })
      .catch((err) => {
        dispatch(ActionCreator.requireAuthorization(AuthStatus.NO_AUTH));
        dispatch(ActionCreator.setActiveAuth({}));
        dispatch(ActionCreator.setIsLoading(false));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((res) => {
        dispatch(ActionCreator.requireAuthorization(AuthStatus.AUTH));
        dispatch(ActionCreator.setActiveAuth(res.data));
        // console.log('USER  post /login: ', res.data);
      })
      .catch((err) => {
        dispatch(ActionCreator.requireAuthorization(AuthStatus.NO_AUTH));
        dispatch(ActionCreator.setActiveAuth({}));
        console.log(`ОБНУЛИЛИ AUTH и AUTHINFO`);
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        userStatus: action.payload,
      });
    case ActionType.AUTH_INFO:
      return Object.assign({}, state, {
        authInfo: action.payload,
      });
    case ActionType.SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
  }

  return state;
};

export {
  ActionCreator,
  AuthStatus,
  ActionType,
  Operation,
  reducer,
};
