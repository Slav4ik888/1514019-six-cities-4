import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as travel} from './travel/travel.js';
import {reducer as user} from './user/user.js';
import {reducer as favorite} from './favorites/favorites.js';

import {NameSpace} from './name-space.js';


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.TRAVEL]: travel,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITE]: favorite,

});
