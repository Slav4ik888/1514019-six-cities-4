import React from 'react';
import PropTypes from 'prop-types';
import {offerTypes} from '../../utils/const.js';
import {getRating} from '../../utils/random.js';

const Card = (props) => {
  const {offer: {isPremium, isFavourite, previewImage, price, rating, cardTitle, offerType},
    onCardTitleClick,
    handleCardFocusEnter,
    handleCardFocusLeave} = props;

  const favClass = isFavourite ? `place-card__bookmark-button--active` : null;

  const handlePointerEnter = () => {
    handleCardFocusEnter(props.offer);
  };

  const handlePointerLeave = () => {
    handleCardFocusLeave();
  };

  return (
    <article className="cities__place-card place-card"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${favClass}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a className="place-card__name_href" href="#"
            onClick={onCardTitleClick}
          >{cardTitle}</a>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  handleCardFocusEnter: PropTypes.func.isRequired,
  handleCardFocusLeave: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    cardTitle: PropTypes.string.isRequired,
    offerType: PropTypes.oneOf([offerTypes.apartment, offerTypes.room, offerTypes.house, offerTypes.hotel]).isRequired,
  }).isRequired
};

export default Card;
