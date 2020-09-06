import {all} from 'redux-saga/effects';
import GetEachCountryTimeLineCovid19 from "./eachCountryTimeLineCovid19/saga";
import GetEachCountryTimeLineThevirus from "./eachCountryTimeLineThevirus/saga";
import GetGlobeStats from "./globeStats/saga";
import GetCountries from "./countries/saga";
import GetProvinceGeo from "./provinceGeo/saga";
import GetRegionIsoNames from "./regionsIsoNames/saga";
import GetSummary from "./summary/saga";

export default function* AppSaga() {
    yield all([
        GetEachCountryTimeLineCovid19(),
        GetEachCountryTimeLineThevirus(),
        GetGlobeStats(),
        GetProvinceGeo(),
        GetRegionIsoNames(),
        GetSummary(),
        GetCountries()
    ]);
}
