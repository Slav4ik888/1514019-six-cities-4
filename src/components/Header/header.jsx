import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import pt from 'prop-types';

import {AppRoute} from '../../utils/const.js';
import {getUserStatus, getAuthInfo} from '../../reducers/user/selectors.js';
import {AuthStatus} from '../../reducers/user/user.js';


const Header = ({authInfo, userStatus}) => {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active"
              to={AppRoute.MAIN}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={userStatus === AuthStatus.AUTH ? AppRoute.FAVORITES : AppRoute.SIGN_IN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  {userStatus === AuthStatus.AUTH ? <span className="header__user-name user__name">{authInfo.email}</span>
                    : <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userStatus: pt.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]).isRequired,
  authInfo: pt.object,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
  authInfo: getAuthInfo(state),
});


export {Header};
export default connect(mapStateToProps)(Header);
