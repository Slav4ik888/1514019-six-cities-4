import pt, {arrayOf} from 'prop-types';
import {offerTypes} from './const.js';
// import {reviewsPropTypes} from './reviews-prop-types.js';


export const offerPropTypes = {
  id: pt.number.isRequired,
  isPremium: pt.bool.isRequired,
  isFavourite: pt.bool.isRequired,
  previewImage: pt.string.isRequired,
  pictures: arrayOf(pt.string),
  amenities: arrayOf(pt.string),
  bedrooms: pt.number.isRequired,
  maxGuestsNumber: pt.string.isRequired,
  description: pt.string.isRequired,
  host: pt.object.isRequired,
  price: pt.number.isRequired,
  rating: pt.number.isRequired,
  cardTitle: pt.string.isRequired,
  offerType: pt.oneOf([offerTypes.apartment, offerTypes.room, offerTypes.house, offerTypes.hotel]).isRequired,
  coordinates: pt.array.isRequired,
  reviews: pt.array.isRequired,
};
