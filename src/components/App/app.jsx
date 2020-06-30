import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Main from '../Main/main.jsx';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {OfferDetails} from '../OfferDetails/offer-details.jsx';
import {ActionCreator} from '../../reducers/reducer.js';


const handleCardTitleClick = () => {};

const App = (props) => {
  const {offers, activeCity, handleChangeCity} = props;

  const _renderApp = () => {

    return (
      <Main
        offers={offers}
        onCardTitleClick={handleCardTitleClick}
        activeCity={activeCity}
        onChangeCity={handleChangeCity}
      />
    );
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {_renderApp()}
          </Route>
          <Route exact path="/offer">
            <OfferDetails offer={offers[1]}/>
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
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeCity(id, city) {
    dispatch(ActionCreator.changeCity(id));
    dispatch(ActionCreator.getOffers(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

