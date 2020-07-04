import pt from 'prop-types';

export const reviewsPropTypes = {
  id: pt.number.isRequired,
  author: pt.shape({
    photo: pt.string,
    name: pt.string,
  }).isRequired,
  description: pt.string.isRequired,
  date: pt.number.isRequired,
  rating: pt.number.isRequired,
};
