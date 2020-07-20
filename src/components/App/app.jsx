import React from 'react';
import {
  // Router,
  Route, Switch,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
// import {offerPropTypes} from '../../utils/offer-prop-types.js';
import OfferDetails from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/travel/travel.js';
import {getAllOffers} from '../../reducers/data/selectors.js';
import {getActiveCity, getActiveOffer} from '../../reducers/travel/selectors.js';
import {getUserStatus, getAuthInfo} from '../../reducers/user/selectors.js';
import {cities, AppRoute} from '../../utils/const.js';
import {SignIn} from '../SignIn/sign-in.jsx';
import {Operation as UserOperation} from '../../reducers/user/user.js';
import Favorites from '../Favorites/favorites.jsx';
import PrivateRoute from '../PrivateRoute/private-route.jsx';
// import {getFavorites} from '../../reducers/favorites/selectors.js';
// import {Operation as FavOperation} from '../../reducers/favorites/favorites.js';
// import {history} from '../../history.js';


const App = (props) => {
  const {
    userStatus,
    authInfo,
    login,
    allOffers,
    activeCity,
    handleChangeCity,
    activeOffer,
    handleCardTitleClick,
    // favorites,
    // loadFavorites,
  } = props;
  // console.log('APP Offers: ', allOffers[cities[activeCity]]);
  // console.log('APP userStatus: ', userStatus);
  // console.log('APP authInfo: ', authInfo);
  // console.log('favorites: ', favorites);
  // loadFavorites();

  return (
    <>
      {/* <Router history={history}> */}
      <BrowserRouter>
        <Switch>

          <Route exact path={AppRoute.ROOT}>
            <Main
              userStatus={userStatus}
              authInfo={authInfo}
              offers={allOffers[cities[activeCity]] || []}
              onCardTitleClick={handleCardTitleClick}
              activeCity={activeCity}
              onChangeCity={handleChangeCity}
            />
          </Route>

          <Route
            exact
            path={AppRoute.LOGIN}
            render={() => (
              <SignIn
                activeCity={activeCity}
                onSubmit={login}
              />)}
          />

          <Route exact path={AppRoute.OFFER}>
            {activeOffer &&
              <OfferDetails
                // userStatus={userStatus}
                // authInfo={authInfo}
                // offer={activeOffer || {}}
                // offers={allOffers[cities[activeCity]] || []}
                // activeCity={activeCity}
              />}
          </Route>

          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => {
              return <Favorites/>;
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
                <Redirect to={AppRoute.ROOT} />
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
  userStatus: PropTypes.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  authInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  allOffers: PropTypes.object.isRequired,
  activeCity: PropTypes.number.isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  handleCardTitleClick: PropTypes.func.isRequired,
  // favorites: PropTypes.array.isRequired,
  // loadFavorites: PropTypes.func.isRequired,
  // offers: PropTypes.arrayOf(
  //     PropTypes.shape(offerPropTypes).isRequired
  // ).isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
  authInfo: getAuthInfo(state),
  allOffers: getAllOffers(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  // favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  // loadFavorites() {
  //   dispatch(FavOperation.loadFavorites());
  // },
  handleChangeCity(id) {
    dispatch(ActionCreator.changeCity(id));
  },
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

