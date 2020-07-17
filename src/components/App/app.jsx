import React from 'react';
import {Router, Route, Switch,
  // BrowserRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
// import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {OfferDetails} from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/travel/travel.js';
import {getAllOffers} from '../../reducers/data/selectors.js';
import {getActiveCity, getActiveOffer} from '../../reducers/travel/selectors.js';
import {getUserStatus, getAuthInfo} from '../../reducers/user/selectors.js';
import {cities} from '../../utils/const.js';
import {SignIn} from '../SignIn/sign-in.jsx';
import {Operation as UserOperation} from '../../reducers/user/user.js';
import {history} from '../../history.js';
import {AppRoute} from '../../utils/const.js';


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
  } = props;
  // console.log('APP Offers: ', allOffers[cities[activeCity]]);
  // console.log('APP userStatus: ', userStatus);
  // console.log('APP authInfo: ', authInfo);

  return (
    <>
      <Router history={history}>
        {/* <BrowserRouter> */}
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

          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              activeCity={activeCity}
              onSubmit={login}
            />
          </Route>

          <Route exact path={AppRoute.OFFER}>
            {activeOffer && <OfferDetails
              offer={activeOffer || {}}
              offers={allOffers[cities[activeCity]] || []}
              activeCity={activeCity}
            />}
          </Route>

        </Switch>
        {/* </BrowserRouter> */}
      </Router>
    </>
  );
};

App.propTypes = {
  userStatus: PropTypes.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  authInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  // activePage: PropTypes.oneOf([`MAIN`, `OFFER_DETAILS`, `SIGN_IN`]).isRequired,
  allOffers: PropTypes.object.isRequired,
  activeCity: PropTypes.number.isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  handleCardTitleClick: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  handleChangeCity(id) {
    dispatch(ActionCreator.changeCity(id));
  },
  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

