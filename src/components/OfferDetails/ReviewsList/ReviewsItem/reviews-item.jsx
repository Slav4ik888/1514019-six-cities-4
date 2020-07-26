import React from 'react';
import pt from 'prop-types';
import {reviewsPropTypes} from '../../../../utils/prop-types-templates.js';
import {getRating} from '../../../../utils/utils.js';
import {showDate} from '../../../../utils/utils.js';


export const ReviewsItem = (props) => {
  const {review: {
    user,
    comment,
    date,
    rating,
  }
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl ? user.avatarUrl : `img/avatar.svg`} width="54" height="54" alt={user.name} />
        </div>
        <span className="reviews__user-name">
          {user.name}
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
          {comment}
        </p>
        <time className="reviews__time" dateTime={showDate(date, `YYYY-MM-DD`)}>{showDate(date, `Month DD, YYYY`)}</time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = pt.shape(reviewsPropTypes).isRequired;
