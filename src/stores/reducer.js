import {combineReducers} from 'redux';
import countryTimeLine from './timeLine/country/reducer';
import totalTimeLine from './timeLine/total/reducer';
import summary from './summary/reducer';

export default function createReducer() {
    return combineReducers({
        countryTimeLine,
        totalTimeLine,
        summary
    });
}