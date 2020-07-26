import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import pt from 'prop-types';
import {offerPropTypes} from '../../utils/prop-types-templates.js';

import {Operation as DataOperation} from '../../reducers/data/data.js';
import {getIsError} from '../../reducers/data/selectors.js';
import {getIsLoading, getReview} from '../../reducers/data/selectors.js';
import {getActiveOffer} from '../../reducers/travel/selectors.js';


const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);
      this._handleChangeStars = this._handleChangeStars.bind(this);
      this._handleChangeComment = this._handleChangeComment.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);

      this.state = {
        isDisabled: true,
        comment: props.dataReview.comment,
        rating: props.dataReview.rating,
      };
    }

    _handleChangeStars(event) {
      const rating = +event.target.value;
      this.setState((prevState) => ({
        rating,
        isDisabled: rating && prevState.comment >= 50 && prevState.comment <= 300 ? false : true,
      }));
    }

    _handleChangeComment(event) {
      const comment = event.target.value;
      this.setState((prevState) => ({
        comment,
        isDisabled: prevState.rating && comment.length >= 50 && comment.length <= 300 ? false : true,
      }));
    }

    _handleSubmit(event) {
      event.preventDefault();

      const review = {
        comment: this.state.comment,
        rating: this.state.rating,
      };
      this.props.saveReview(this.props.activeOffer.id, review);
    }

    render() {
      return <Component
        {...this.props}
        isDisabled={this.state.isDisabled}
        isLoading={this.props.isLoading}
        isError={this.props.isError}
        commentText={this.state.comment}
        onChangeComment={this._handleChangeComment}
        onChangeStars={this._handleChangeStars}
        onSubmit={this._handleSubmit}
      />;
    }
  }

  WithForm.propTypes = {
    saveReview: pt.func.isRequired,
    isLoading: pt.bool.isRequired,
    dataReview: pt.shape({
      comment: pt.string,
      rating: pt.number,
    }).isRequired,
    isError: pt.bool.isRequired,
    activeOffer: pt.shape(offerPropTypes).isRequired,
  };

  const mapStateToProps = (state) => ({
    isLoading: getIsLoading(state),
    activeOffer: getActiveOffer(state),
    dataReview: getReview(state),
    isError: getIsError(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    saveReview(id, review) {
      dispatch(DataOperation.saveReview(id, review));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
