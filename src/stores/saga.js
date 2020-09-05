import {all} from 'redux-saga/effects';
import GetEachCountryTimeLine from "./eachCountryTimeLine/saga";
import GetAllCountryTimeLine from "./allCountriesTimeLine/saga";
import GetGlobeStats from "./globeStats/saga";
import GetProvinceGeo from "./provinceGeo/saga";
import GetRegionIsoNames from "./regionsIsoNames/saga";

export default function* AppSaga() {
    yield all([
        GetAllCountryTimeLine(),
        GetEachCountryTimeLine(),
        GetGlobeStats(),
        GetProvinceGeo(),
        GetRegionIsoNames()
    ]);
}
