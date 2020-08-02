import React from 'react';
import {connect} from 'react-redux';
import cl from 'classnames';

// import {Link} from 'react-router-dom';
import {history} from '../../history.js';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import {Operation as DataOperation} from '../../reducers/data/data.js';
import {getUserStatus} from '../../reducers/user/selectors.js';
import {AuthStatus} from '../../reducers/user/user.js';

import {AppRoute, placesType} from '../../utils/const.js';


const ButtonFavorite = ({offer, type, userStatus, handleFavClick}) => {
  const btnClass = cl(`button`,
      {[`place-card__bookmark-button`]: type !== placesType.OFFER_DETAILS},
      {[`property__bookmark-button`]: type === placesType.OFFER_DETAILS},
      {[`place-card__bookmark-button--active`]: offer.isFavorite}

  );

  const handleButtonClick = () => {
    if (userStatus === AuthStatus.AUTH) {
      handleFavClick(offer);
    } else {
      history.push(AppRoute.SIGN_IN);
    }
  };

  return (
    <button className={btnClass} type="button"
      onClick={handleButtonClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};


ButtonFavorite.propTypes = {
  offer: pt.shape(offerPropTypes).isRequired,
  type: pt.oneOf([placesType.CITY, placesType.NEAR, placesType.FAVORITE, placesType.OFFER_DETAILS]).isRequired,
  userStatus: pt.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]).isRequired,
  handleFavClick: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFavClick(offer) {
    dispatch(DataOperation.toggleFavorite(offer));
  },
});

export {ButtonFavorite};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonFavorite);
