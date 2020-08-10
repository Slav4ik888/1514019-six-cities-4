import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {history} from '../../history.js';

import pt from 'prop-types';

import Main from '../Main/main.jsx';
import SignIn from '../SignIn/sign-in.jsx';
import OfferDetails from '../OfferDetails/offer-details.jsx';
import Favorites from '../Favorites/favorites.jsx';
import FavoritesEmpty from '../FavoritesEmpty/favorites-empty.jsx';
import PrivateRoute from '../PrivateRoute/private-route.jsx';

import {Operation as UserOperation, AuthStatus} from '../../reducers/user/user.js';
import {getIsLoading, getUserStatus} from '../../reducers/user/selectors.js';
import {getIsFavoritesEmpty} from '../../reducers/data/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';

import {AppRoute} from '../../utils/const.js';


const App = ({userStatus, isLoading, isFavoritesEmpty, login}) => {

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Router history={history}>
        <Switch>

          <Route exact path={AppRoute.MAIN} component={Main}/>

          <Route exact path={AppRoute.SIGN_IN}
            render={() => {
              return (
                userStatus === AuthStatus.NO_AUTH ?
                  <SignIn
                    onSubmit={login}
                  /> :
                  <Redirect to={AppRoute.MAIN}/>
              );
            }}
          />

          <Route exact path={AppRoute.ROOM_ID} component={OfferDetails} />

          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => {
              if (!isFavoritesEmpty) {
                return <Favorites />;
              }
              return <FavoritesEmpty />;
            }}
          />

          <Route
            render={() => (
              <>
                <h1>
                  404.
                  <br />
                  <small>Page not found</small>
                </h1>
                <Redirect to={AppRoute.MAIN} />
              </>
            )}
          />

        </Switch>
      </Router>
    </>
  );
};

App.propTypes = {
  userStatus: pt.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]).isRequired,
  login: pt.func.isRequired,
  isLoading: pt.bool.isRequired,
  isFavoritesEmpty: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
  isLoading: getIsLoading(state),
  isFavoritesEmpty: getIsFavoritesEmpty(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(DataOperation.loadOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

