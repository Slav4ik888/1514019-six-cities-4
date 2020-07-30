import React from 'react';
import {// Router,
  BrowserRouter,
  Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import {history} from '../../history.js';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import Main from '../Main/main.jsx';
import SignIn from '../SignIn/sign-in.jsx';
import OfferDetails from '../OfferDetails/offer-details.jsx';
import Favorites from '../Favorites/favorites.jsx';
import FavoritesEmpty from '../FavoritesEmpty/favorites-empty.jsx';
import PrivateRoute from '../PrivateRoute/private-route.jsx';

import {Operation as UserOperation} from '../../reducers/user/user.js';
import {getIsLoading} from '../../reducers/user/selectors.js';
import {getActiveCity, getActiveOffer} from '../../reducers/travel/selectors.js';
import {getIsFavoritesEmpty} from '../../reducers/data/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';

import {AppRoute} from '../../utils/const.js';


const App = ({isLoading, isFavoritesEmpty, login, activeOffer, activeCity}) => {
  console.log('isFavoritesEmpty: ', isFavoritesEmpty);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* <Router history={history}> */}
      <BrowserRouter>
        <Switch>

          <Route exact path={AppRoute.MAIN} component={Main}/>

          <Route
            exact
            path={AppRoute.SIGN_IN}
            render={() => (
              <SignIn
                activeCity={activeCity}
                onSubmit={login}
              />)}
          />

          <Route exact path={AppRoute.ROOM}>
            {activeOffer && <OfferDetails/>}
          </Route>

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
      </BrowserRouter>
      {/* </Router> */}
    </>
  );
};

App.propTypes = {
  login: pt.func.isRequired,
  activeCity: pt.number.isRequired,
  activeOffer: pt.shape(offerPropTypes),
  isLoading: pt.bool.isRequired,
  isFavoritesEmpty: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
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

