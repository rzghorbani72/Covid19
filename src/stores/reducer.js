import {combineReducers} from 'redux';
import eachCountryTimeLine from './eachCountryTimeLine/reducer';
import summary from './summary/reducer';

export default function createReducer() {
    return combineReducers({
        eachCountryTimeLine,
        summary
    });
}