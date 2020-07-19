import {NameSpace} from '../name-space.js';

const NAME_SPACE = NameSpace.FAVORITE;

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};
