import React, {PureComponent} from 'react';
import pt from 'prop-types';

const withFavorite = (Component) => {
  class WithFavorite extends PureComponent {
    constructor(props) {
      super(props);
      this._handleFavClick = this._handleFavClick.bind(this);

      this.state = {
        isFav: props.offer.isFavorite || false,
      };
    }

    // handleButtonBookClick() {
    //   const {toggleFavorite, offer} = this.props;
    //   toggleFavorite({
    //     hotelId: offer.id,
    //     status: !offer.isFavorite
    //   });
    // }


    _handleFavClick() {

      this.setState((state) => ({
        isFav: !state.isFav,
      }));
      console.log('isFav: ', this.state.isFav);
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
    onFavClick: pt.func.isRequired,
    offer: pt.object.isRequired,
  };

  return WithFavorite;
};

export default withFavorite;
