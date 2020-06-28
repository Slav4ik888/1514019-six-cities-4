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
  const {offers, activeCity} = props;

  const _renderApp = () => {

    return (
      <Main offers={offers}
        onCardTitleClick={handleCardTitleClick}
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
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(id, city) {
    dispatch(ActionCreator.changeCity(id));
    dispatch(ActionCreator.getOffers(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

