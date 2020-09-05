import {combineReducers} from 'redux';
import eachCountryTimeLine from './eachCountryTimeLine/reducer';
import allCountriesTimeLine from './allCountriesTimeLine/reducer';
import globeStats from './globeStats/reducer';
import provinceGeo from './provinceGeo/reducer';
import regionsIsoName from './regionsIsoNames/reducer';

export default function createReducer() {
    return combineReducers({
        eachCountryTimeLine,
        allCountriesTimeLine,
        globeStats,
        provinceGeo,
        regionsIsoName
    });
}