import React from 'react';
import pt from 'prop-types';


const FormReview = ({commentText, onChangeComment, onChangeStars, onSubmit,
  isDisabled, isLoading, isError}) => {

  return (
    <>
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={onSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onClick={onChangeStars}
          />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onClick={onChangeStars}
          />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onClick={onChangeStars}
          />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onClick={onChangeStars}
          />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onClick={onChangeStars}
          />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        {isError && `Не удалось отправить отзыв, попытайтесь повторить через некоторое время`}
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={onChangeComment} value={commentText}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || isLoading}>Submit</button>
        </div>
      </form>
    </>
  );
};

FormReview.propTypes = {
  commentText: pt.string,
  onChangeComment: pt.func.isRequired,
  onChangeStars: pt.func.isRequired,
  onSubmit: pt.func.isRequired,
  isDisabled: pt.bool.isRequired,
  isLoading: pt.bool.isRequired,
  isError: pt.bool.isRequired,
};


export default FormReview;
