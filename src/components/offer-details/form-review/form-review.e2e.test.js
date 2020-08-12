import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormReview from './form-review.jsx';

// import {testOffer} from '../../mocks/test-offer.js';
// import {offers} from '../../mocks/offers.js';

// const noop = () => {};

Enzyme.configure({adapter: new Adapter()});


describe(`<FormReview /> tests`, () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // const mockEvent = {
  //   preventDefault: noop,
  // };
  const formSendPrevention = jest.fn();

  const onChangeStars = jest.fn();
  const onChangeComment = jest.fn((...args) => [...args]);
  const onSubmit = jest.fn();
  const commentText = `HellowingBro`;

  const renderComponent = (props = {}) => {
    return mount(
        <BrowserRouter>
          <FormReview
            isDisabled={true}
            isLoading={false}
            isError={false}
            commentText={commentText}
            onChangeComment={onChangeComment}
            onChangeStars={onChangeStars}
            onSubmit={onSubmit}
            {...props}
          />
        </BrowserRouter>
    );
  };

  it(`Нажали submit`, () => {
    const component = renderComponent();

    const submit = component.find(`form.reviews__form.form`);
    submit.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    // expect(formSendPrevention).toHaveBeenCalledTimes(1);

  });

  // it(`Нажали onChangeStars`, () => {
  //   const component = renderComponent();
  // const form = component.find(`form`);
  // const change = component.find(`input`).at(1);

  // change.simulate(`change`, {target: {checked: true}});
  // form.simulate(`submit`, {preventDefault() {}});

  // expect(onChangeStars).toHaveBeenCalledTimes(1);
  // expect(onChangeStars.mock.calls[0][0]).toEqual(undefined);
  // expect(component.find(`input`).map((it) => it.prop(`checked`)).toEqual(5));

  // });

  // it(`Нажали onChangeComment`, () => {
  //   const component = renderComponent();
  //   const comment = component.find(`.reviews__textarea`);

  //   comment.simulate(`change`, {value: commentText});

  //   expect(onChangeComment).toHaveBeenCalledTimes(1);
  //   expect(onChangeComment.mock.calls[0][0]).toEqual(commentText);

  // });

});

// npm test form-review.e2e.test.js
