import {all} from 'redux-saga/effects';
import GetLists from "./models/card/saga";

export default function* AppSaga() {
    yield all([
        GetLists(),
    ]);
}
