import {all} from 'redux-saga/effects';
import GetEachCountryTimeLine from "./eachCountryTimeLine/saga";
import GetSummary from "./summary/saga";

export default function* AppSaga() {
    yield all([
        GetEachCountryTimeLine(),
        GetSummary()
    ]);
}
