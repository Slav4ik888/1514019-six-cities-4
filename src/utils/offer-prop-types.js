import PropTypes from 'prop-types';
import {offerTypes} from './const.js';


export const offerPropTypes = {
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  cardTitle: PropTypes.string.isRequired,
  offerType: PropTypes.oneOf([offerTypes.apartment, offerTypes.room, offerTypes.house, offerTypes.hotel]).isRequired,
  coordinates: PropTypes.array.isRequired,
};
