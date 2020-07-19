import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../utils/offer-prop-types.js';
import {getRating} from '../../utils/utils.js';
import {AppRoute} from '../../utils/const.js';
import {getUserStatus} from '../../reducers/user/selectors.js';


const Card = (props) => {
  const {offer: {isPremium, isFavourite, previewImage, price, rating, cardTitle, offerType},
    onCardTitleClick,
    onCardFocusEnter,
    onCardFocusLeave,
    // userStatus,
    onFavClick,
    isFav,
  } = props;

  const favClass = isFav ? `place-card__bookmark-button--active` : null;


  const handleTitleClick = () => {
    // console.log('handleTitleClick: ', props.offer);
    onCardTitleClick(props.offer);
  };

  const handlePointerEnter = () => {
    onCardFocusEnter(props.offer);
  };

  const handlePointerLeave = () => {
    onCardFocusLeave();
  };

  // const handleFavClick = () => {
  //   if (userStatus === `AUTH`) {
  //     // console.log(userStatus);
  //     return <Redirect to={AppRoute.LOGIN} />;
  //   }
  // };

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
          <button className={`place-card__bookmark-button button ${favClass}`} type="button"
            onClick={onFavClick}
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
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});


export {Card};
export default connect(mapStateToProps)(Card);
