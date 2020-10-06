import {all} from 'redux-saga/effects';
import CountryTimeLine from "./timeLine/country/saga";
import TotalTimeLine from "./timeLine/total/saga";
import GetSummary from "./summary/saga";

export default function* AppSaga() {
    yield all([
        CountryTimeLine(),
        TotalTimeLine(),
        GetSummary()
    ]);
}
