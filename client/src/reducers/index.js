import { combineReducers } from 'redux';
import place from './place';
import user from './user';

export default combineReducers({
    place,
    user
})