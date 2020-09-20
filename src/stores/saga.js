import {all} from 'redux-saga/effects';
import TimeLine from "./timeLine/saga";
import GetSummary from "./summary/saga";

export default function* AppSaga() {
    yield all([
        TimeLine(),
        GetSummary()
    ]);
}
