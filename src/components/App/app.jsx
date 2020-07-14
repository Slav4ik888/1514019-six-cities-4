import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
// import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {OfferDetails} from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/travel/travel.js';
import {getAllOffers} from '../../reducers/data/selectors.js';
import {getActiveCity, getActiveOffer, getActivePage} from '../../reducers/travel/selectors.js';
import {getUserStatus, getAuthInfo} from '../../reducers/user/selectors.js';
import {cities, pages} from '../../utils/const.js';
import {SignIn} from '../SignIn/sign-in.jsx';
import {Operation as UserOperation} from '../../reducers/user/user.js';

const App = (props) => {
  const {
    userStatus,
    authInfo,
    login,
    activePage,
    handleChangePage,
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {activeOffer ?
              <OfferDetails
                offer={activeOffer || {}}
                offers={allOffers[cities[activeCity]] || []}
                activeCity={activeCity}
              /> : null}
            {activePage === pages.MAIN ?
              <Main
                userStatus={userStatus}
                authInfo={authInfo}
                offers={allOffers[cities[activeCity]] || []}
                onCardTitleClick={handleCardTitleClick}
                activeCity={activeCity}
                onChangeCity={handleChangeCity}
                onChangePage={handleChangePage}
              /> : null}
            {activePage === pages.SIGN_IN ?
              <SignIn
                activeCity={activeCity}
                onSubmit={login}
              /> : null}
          </Route>

          {/* <Route exact path="/dev_offer">
            <OfferDetails
              offer={allOffers[cities[0]] || {}}
              offers={allOffers[cities[activeCity]] || []}
              activeCity={activeCity}
            />
          </Route> */}
          {/* <Route exact path="/dev_sign-in">
            <SignIn
              activeCity={activeCity}
              onSubmit={login}
            />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

App.propTypes = {
  userStatus: PropTypes.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  authInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  activePage: PropTypes.oneOf([`MAIN`, `OFFER_DETAILS`, `SIGN_IN`]).isRequired,
  handleChangePage: PropTypes.func.isRequired,
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
  activePage: getActivePage(state),
  allOffers: getAllOffers(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(ActionCreator.setActivePage(`MAIN`));
  },
  handleChangePage(page) {
    dispatch(ActionCreator.setActivePage(page));
  },
  handleChangeCity(id) {
    dispatch(ActionCreator.changeCity(id));
    // dispatch(ActionCreator.setOffers(id));
  },

  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

