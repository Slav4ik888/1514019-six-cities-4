import React from 'react';
import {Link} from 'react-router-dom';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import ButtonFavorite from '../button-favorite/button-favorite.jsx';

import {getRating} from '../../utils/utils.js';
import {AppRoute, placesType} from '../../utils/const.js';


const Card = ({offer, onCardFocusEnter, onCardFocusLeave,
  onFavClick, isFav, type}) => {
  const {id, isPremium, previewImage, price, rating, cardTitle, offerType} = offer;

  const handlePointerEnter = () => {
    if (onCardFocusEnter) {
      onCardFocusEnter(offer);
    }
  };

  const handlePointerLeave = () => {
    if (onCardFocusLeave) {
      onCardFocusLeave();
    }
  };

  let placeCard;
  let imageWrapper;
  let placeCardInfo;
  let imgWidth;
  let imgHeight;

  switch (type) {
    case placesType.CITY:
      placeCard = `cities__place-card place-card`;
      imageWrapper = `cities__image-wrapper place-card__image-wrapper`;
      placeCardInfo = `place-card__info`;
      imgWidth = 260; imgHeight = 200;
      break;

    case placesType.NEAR:
      placeCard = `near-places__card place-card`;
      imageWrapper = `near-places__image-wrapper place-card__image-wrapper`;
      placeCardInfo = `place-card__info`;
      imgWidth = 260; imgHeight = 200;
      break;

    case placesType.FAVORITE:
      placeCard = `favorites__card place-card`;
      imageWrapper = `favorites__image-wrapper place-card__image-wrapper`;
      placeCardInfo = `favorites__card-info place-card__info`;
      imgWidth = 150; imgHeight = 110;
      break;
  }

  return (
    <article className={placeCard}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={imageWrapper}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image" />
        </a>
      </div>
      <div className={placeCardInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonFavorite
            isFav={isFav}
            onFavClick={onFavClick}
            offer={offer}
            type={type}
          />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link className="place-card__name_href"
            to={`${AppRoute.ROOM}/${id}`}
          >
            {cardTitle}
          </Link>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  onCardFocusEnter: pt.func,
  onCardFocusLeave: pt.func,
  offer: pt.shape(offerPropTypes).isRequired,
  isFav: pt.bool,
  onFavClick: pt.func,
  type: pt.oneOf([placesType.CITY, placesType.NEAR, placesType.FAVORITE, placesType.OFFER_DETAILS]).isRequired,

};


export default Card;
