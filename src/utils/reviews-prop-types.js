import pt from 'prop-types';

export const reviewsPropTypes = {
  id: pt.number.isRequired,
  user: pt.shape({
    avatarUrl: pt.string,
    id: pt.number,
    isPro: pt.bool,
    name: pt.string,
  }).isRequired,
  comment: pt.string.isRequired,
  date: pt.number.isRequired,
  rating: pt.number.isRequired,
};
