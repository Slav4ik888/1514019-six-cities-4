import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {OfferDetails} from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/reducer.js';


const App = (props) => {
  const {
    offers,
    activeCity,
    handleChangeCity,
    activeOffer,
    handleCardTitleClick,
  } = props;

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {activeOffer ?
              <OfferDetails
                offer={activeOffer}
                offers={offers}
                activeCity={activeCity}
              /> :

              <Main
                offers={offers}
                onCardTitleClick={handleCardTitleClick}
                activeCity={activeCity}
                onChangeCity={handleChangeCity}
              />}
          </Route>
          <Route exact path="/offer">
            <OfferDetails
              offer={offers[0]}
              offers={offers}
              activeCity={activeCity}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape(offerPropTypes).isRequired
  ).isRequired,
  activeCity: PropTypes.number.isRequired,
  handleChangeCity: PropTypes.func.isRequired,
  activeOffer: PropTypes.object,
  handleCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(id) {
    dispatch(ActionCreator.changeCity(id));
    dispatch(ActionCreator.setOffers(id));
  },

  handleCardTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

