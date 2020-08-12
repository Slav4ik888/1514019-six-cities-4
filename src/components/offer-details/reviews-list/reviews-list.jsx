import React from 'react';
import pt from 'prop-types';

import ReviewsItem from './ReviewsItem/reviews-item.jsx';

import {reviewsPropTypes} from '../../../utils/prop-types-templates.js';
import {MAX_REVIEW_COUNT} from '../../../utils/const.js';


const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.length ?
        reviews
          .sort((a, b) => a.date - b.date)
          .reverse()
          .slice(0, MAX_REVIEW_COUNT)
          .map((review) => (
            <ReviewsItem
              key={review.id}
              review={review}
            />
          )) : ``}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: pt.arrayOf(
      pt.shape(reviewsPropTypes).isRequired
  )
};

export default ReviewsList;
