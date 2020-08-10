import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {history} from '../../history.js';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';


import {Operation as DataOperation} from '../../reducers/data/data.js';
import {AuthStatus} from '../../reducers/user/user.js';
import {getUserStatus} from '../../reducers/user/selectors.js';

import {AppRoute} from '../../utils/const.js';


const withFavorite = (Component) => {

  class WithFavorite extends PureComponent {
    constructor(props) {
      super(props);
      this._handleFavClick = this._handleFavClick.bind(this);

      this.state = {
        isFav: props.offer.isFavorite,
      };
    }

    _handleFavClick(offer) {
      if (this.props.userStatus === AuthStatus.AUTH) {
        this.props.onToggleFav(offer);
        this.setState((state) => ({
          isFav: !state.isFav,
        }));
      } else {
        history.push(AppRoute.SIGN_IN);
      }
    }

    render() {
      return <Component
        {...this.props}
        isFav={this.state.isFav}
        onFavClick={this._handleFavClick}
      />;
    }
  }

  WithFavorite.propTypes = {
    userStatus: pt.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]).isRequired,
    offer: pt.shape(offerPropTypes).isRequired,
    onToggleFav: pt.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    userStatus: getUserStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onToggleFav(offer) {
      dispatch(DataOperation.toggleFavorite(offer));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFavorite);
};


export default withFavorite;

