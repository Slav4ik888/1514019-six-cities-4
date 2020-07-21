import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {getRating} from '../../utils/utils.js';
import {AppRoute} from '../../utils/const.js';
import {getUserStatus} from '../../reducers/user/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';
import {placesType} from '../../utils/const.js';


const Card = (props) => {
  const {offer: {isPremium, previewImage, price, rating, cardTitle, offerType},
    loadReviews, loadNearbies,
    onCardTitleClick,
    onCardFocusEnter,
    onCardFocusLeave,
    onFavClick,
    isFav,
    type,
  } = props;

  const favClass = isFav ? `place-card__bookmark-button--active` : null;

  const handleTitleClick = () => {
    loadReviews(props.offer.id);
    loadNearbies(props.offer.id);
    onCardTitleClick(props.offer);
  };

  const handlePointerEnter = () => {
    onCardFocusEnter(props.offer);
  };

  const handlePointerLeave = () => {
    onCardFocusLeave();
  };

  const handleFavClick = () => {
    onFavClick(props.offer);
  };

  return (
    <article
      className={type === placesType.CITY ? `cities__place-card place-card` : `near-places__card place-card`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={type === placesType.CITY ? `cities__image-wrapper` : `near-places__image-wrapper` + `place-card__image-wrapper`} >
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
          <button className={`place-card__bookmark-button button ${favClass}`} type="button"
            onClick={handleFavClick}
          >
            {/* {userStatus === `AUTH` ? <Redirect to={AppRoute.LOGIN} /> : null} */}
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
          <Link className="place-card__name_href"
            to={AppRoute.OFFER}
            onClick={handleTitleClick}
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
  userStatus: PropTypes.oneOf([`AUTH`, `NO_AUTH`]).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardFocusEnter: PropTypes.func.isRequired,
  onCardFocusLeave: PropTypes.func.isRequired,
  offer: PropTypes.shape(offerPropTypes).isRequired,
  isFav: PropTypes.bool.isRequired,
  onFavClick: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadNearbies: PropTypes.func.isRequired,
  type: PropTypes.oneOf([placesType.CITY, placesType.NEAR]).isRequired,

};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(id) {
    dispatch(DataOperation.loadComments(id));
  },
  loadNearbies(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
  },
});

export {Card};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
