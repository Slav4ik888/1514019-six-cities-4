import React, {PureComponent, createRef} from 'react';
// import {Redirect} from 'react-router-dom';
import pt from 'prop-types';

import Page from '../Page/page.jsx';

import {cities, pageType} from '../../utils/const.js';
import {AppRoute} from '../../utils/const.js';


export default class SignIn extends PureComponent {

  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });

    this.loginRef.current.value = ``;
    this.passwordRef.current.value = ``;
    history.push(AppRoute.MAIN);
    // return <Redirect to={AppRoute.MAIN}/>;
  }

  render() {
    const {activeCity} = this.props;

    return (
      <>
        <Page type={pageType.SIGN_IN}>

          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form
                  className="login__form form"
                  action="#"
                  method="post"
                  onSubmit={this.handleSubmit}
                >
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input className="login__input form__input" type="email" name="email" placeholder="Email" required=""
                      ref={this.loginRef}
                    />
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input className="login__input form__input" type="password" name="password" placeholder="Password" required=""
                      ref={this.passwordRef}
                    />
                  </div>
                  <button className="login__submit form__submit button" type="submit">Sign in</button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{cities[activeCity]}</span>
                  </a>
                </div>
              </section>
            </div>
          </main>
        </Page>
      </>
    );
  }
}

SignIn.propTypes = {
  activeCity: pt.number.isRequired,
  onSubmit: pt.func.isRequired,
};
