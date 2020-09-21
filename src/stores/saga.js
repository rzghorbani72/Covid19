import {all} from 'redux-saga/effects';
import TimeLine from "./timeLine/country/saga";
import FullTimeLine from "./timeLine/full/saga";
import GetSummary from "./summary/saga";

export default function* AppSaga() {
    yield all([
        TimeLine(),
        FullTimeLine(),
        GetSummary()
    ]);
}
