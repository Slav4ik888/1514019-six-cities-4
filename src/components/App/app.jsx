import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
// import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {OfferDetails} from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/travel/travel.js';
import {getAllOffers} from '../../reducers/data/selectors.js';
import {getActiveCity, getOffers, getActiveOffer} from '../../reducers/travel/selectors.js';
import {cities} from '../../utils/const.js';

const App = (props) => {
  const {
    allOffers,
    // offers,
    activeCity,
    handleChangeCity,
    activeOffer,
    handleCardTitleClick,
  } = props;
  // console.log('APP Offers: ', allOffers[cities[activeCity]]);

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
              /> :

              <Main
                offers={allOffers[cities[activeCity]] || []}
                onCardTitleClick={handleCardTitleClick}
                activeCity={activeCity}
                onChangeCity={handleChangeCity}
              />}
          </Route>

          {/* <Route exact path="/dev_offer">
            <OfferDetails
              offer={allOffers[cities[0]] || {}}
              offers={allOffers[cities[activeCity]] || []}
              activeCity={activeCity}
            />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </>
  );
};

App.propTypes = {
  allOffers: PropTypes.object.isRequired,
  // offers: PropTypes.arrayOf(
  //     PropTypes.shape(offerPropTypes).isRequired
  // ).isRequired,
  activeCity: PropTypes.number.isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  handleCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allOffers: getAllOffers(state),
  activeCity: getActiveCity(state),
  offers: getOffers(state),
  activeOffer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
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

