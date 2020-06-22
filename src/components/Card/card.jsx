import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {offer, onCardFocus} = props;
  const {id, cardMark, src, priceValue, priceText, cardName, cardType} = offer;

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => onCardFocus(id)}>
      <div className="place-card__mark">
        <span>{cardMark}</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={src} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `100%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a className="place-card__name_href" href="#">{cardName}</a>
        </h2>
        <p className="place-card__type">{cardType}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  onCardFocus: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cardMark: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    raiting: PropTypes.number.isRequired,
    cardName: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
