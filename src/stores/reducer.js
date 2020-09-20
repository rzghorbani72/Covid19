import {combineReducers} from 'redux';
import timeLine from './timeLine/reducer';
import summary from './summary/reducer';

export default function createReducer() {
    return combineReducers({
        timeLine,
        summary
    });
}