import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';

import {Operation as DataOperation} from '../../reducers/data/data.js';


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
      this.props.onToggleFav(offer);
      this.setState((state) => ({
        isFav: !state.isFav,
      }));
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
    onToggleFav: pt.func.isRequired,
    offer: pt.object.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    onToggleFav(offer) {
      dispatch(DataOperation.toggleFavorite(offer));
    },
  });

  return connect(undefined, mapDispatchToProps)(WithFavorite);
};


export default withFavorite;

