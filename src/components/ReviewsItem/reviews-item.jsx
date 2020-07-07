import React from 'react';
import pt from 'prop-types';
import {reviewsPropTypes} from '../../utils/reviews-prop-types.js';
import {getRating} from '../../utils/utils.js';
import {showDate} from '../../utils/utils.js';


export const ReviewsItem = (props) => {
  const {review: {
    author: {photo, name},
    description,
    date,
    rating,
  }
  } = props;


  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={photo ? photo : `img/avatar.svg`} width="54" height="54" alt={name} />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {description}
        </p>
        <time className="reviews__time" dateTime={showDate(date, `YYYY-MM-DD`)}>{showDate(date, `Month YYYY`)}</time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = pt.shape(reviewsPropTypes).isRequired;
