import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import SignIn from './sign-in.jsx';

import {NameSpace} from '../../reducers/name-space.js';


const mockStore = configureStore([]);

const authInfo = {
  avatarUrl: `/static/avatar/7.jpg`,
  email: `korzan.va@mail.ru`,
  id: 1,
  isPro: false,
  name: `Vyacheslav`,
};

const noop = () => {};

Enzyme.configure({adapter: new Adapter()});


describe(`<FormReview /> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockEvent = {
    preventDefault: noop,
  };
  const onSubmit = jest.fn();
  const loginData = {
    login: ``,
    password: ``
  };

  const store = mockStore({
    [NameSpace.USER]: {
      userStatus: `NO_AUTH`,
      authInfo,
    },
  });
  const renderComponent = (props = {}) => {
    return mount(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn
              onSubmit={onSubmit}
              {...props}
            />
          </BrowserRouter>
        </Provider>

    );
  };

  it(`Нажали submit`, () => {
    const component = renderComponent();

    const submit = component.find(`.login__form`);
    submit.simulate(`submit`, mockEvent);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject(loginData);
    // expect(formSendPrevention).toHaveBeenCalledTimes(1);

  });

});

// npm test sign-in.e2e.test.js
