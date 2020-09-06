import {combineReducers} from 'redux';
import eachCountryTimeLineThevirus from './eachCountryTimeLineThevirus/reducer';
import eachCountryTimeLineCovid19 from './eachCountryTimeLineCovid19/reducer';
import globeStats from './globeStats/reducer';
import countries from './countries/reducer';
import provinceGeo from './provinceGeo/reducer';
import regionsIsoName from './regionsIsoNames/reducer';
import summary from './summary/reducer';

export default function createReducer() {
    return combineReducers({
        eachCountryTimeLineThevirus,
        eachCountryTimeLineCovid19,
        globeStats,
        provinceGeo,
        regionsIsoName,
        summary,
        countries
    });
}