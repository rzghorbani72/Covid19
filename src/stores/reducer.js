import {combineReducers} from 'redux';
import timeLine from './timeLine/country/reducer';
import fullTimeLine from './timeLine/full/reducer';
import summary from './summary/reducer';

export default function createReducer() {
    return combineReducers({
        timeLine,
        fullTimeLine,
        summary
    });
}