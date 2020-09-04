import {combineReducers} from 'redux';
import getEachCountryTimeLine from './eachCountryTimeLine/reducer';

export default function createReducer() {
    return combineReducers({
        getEachCountryTimeLine,
    });
}