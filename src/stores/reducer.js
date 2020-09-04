import {combineReducers} from 'redux';
import lists from './models/list/reducer';
import cards from './models/card/reducer';

export default function createReducer() {
    return combineReducers({
        lists,
        cards
    });
}