export const offerTypes = {
  apartment: `Apartment`,
  room: `Private room`,
  house: `House`,
  hotel: `Hotel`,
};

export const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

export const coordsCities = [
  [48.856663, 2.351556],
  [50.930779, 6.938399],
  [50.851309, 4.351718],
  [52.38333, 4.9],
  [53.552645, 9.966287],
  [51.230569, 6.787428],
];


export const AppRoute = {
  SIGN_IN: `/sign_in`,
  ROOT: `/`,
  MAIN_EMPTY: `/main_empty`,
  OFFER: `/offer`,
  OFFER_ID: `/offer/:id`,
  FAVORITES: `/favorites`,
  FAVORITES_EMPTY: `/favorites-empty`,
};

export const placesType = {
  NEAR: `NEAR`,
  CITY: `CITY`,
  FAVORITE: `FAVORITE`,
};

export const MAX_REVIEW_COUNT = 10;

export const sortType = {
  POPULAR: `popular`,
  LOW_HIGH: `low-high`,
  HIGH_LOW: `high-low`,
  RATING: `rating`,
};

export const pageType = {
  MAIN: `MAIN`,
  SIGN_IN: `SIGN_IN`,
  OFFER: `OFFER`,
  FAVORITES: `FAVORITES`,
  FAVORITES_EMPTY: `FAVORITES_EMPTY`,
};
