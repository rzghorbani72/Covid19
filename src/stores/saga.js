import {all} from 'redux-saga/effects';
import GetLists from "./eachCountryTimeLine/saga";

export default function* AppSaga() {
    yield all([
        GetLists(),
    ]);
}
