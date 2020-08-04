import React from 'react';
import cl from 'classnames';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import {placesType} from '../../utils/const.js';


const ButtonFavorite = ({isFav, type, onFavClick, offer}) => {
  const btnClass = cl(`button`,
      {[`place-card__bookmark-button`]: type !== placesType.OFFER_DETAILS},
      {[`property__bookmark-button`]: type === placesType.OFFER_DETAILS},
      {[`place-card__bookmark-button--active`]: isFav}
  );

  const handleFavClick = () => {
    onFavClick(offer);
  };

  return (
    <button className={btnClass} type="button"
      onClick={handleFavClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};


ButtonFavorite.propTypes = {
  isFav: pt.bool.isRequired,
  offer: pt.shape(offerPropTypes).isRequired,
  type: pt.oneOf([placesType.CITY, placesType.NEAR, placesType.FAVORITE, placesType.OFFER_DETAILS]).isRequired,
  onFavClick: pt.func.isRequired,
};


export default ButtonFavorite;
