import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './components/App/app.jsx';
import reducer from './reducers/reducer.js';
import {createAPI} from './api.js';
import {Operation as UserOperation, ActionCreator, AuthStatus} from './reducers/user/user.js';
import {Operation as DataOperation} from './reducers/data/data.js';
import {history} from './history.js';
import {AppRoute} from './utils/const.js';


// Выносим код в отдельную функцию, чтобы развязать циклическую зависимость:
// `store` зависит от `api`, а `api` зависит от `store`.
const onError = (err) => { // Если будет поймана ошибка 401 "нет авторизации", то будет вызвана эта функция
// console.log('INDEX err: ', err);

  if (err === 400) {
    console.log('INDEX 400 Bad request');
    store.dispatch(ActionCreator.requireAuthorization(AuthStatus.NO_AUTH));
    store.dispatch(ActionCreator.setActiveAuth({}));
  }
  if (err === 401) {
    console.log('INDEX onUnauthorized');
    store.dispatch(ActionCreator.requireAuthorization(AuthStatus.NO_AUTH));
    store.dispatch(ActionCreator.setActiveAuth({}));
    // history.push(AppRoute.SIGN_IN);
  }
};

const api = createAPI(onError);

const store = createStore(
    reducer,
    compose(
        // withExtraArgument применяем чтобы можно было передать 3й аргумент api
        // потому что thunk принимает только 2 аргумента
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`));
