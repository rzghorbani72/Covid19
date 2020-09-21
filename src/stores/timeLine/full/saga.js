import {takeLatest, put, call, select} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../../services/request';
import {api} from '../../../services/api';
import {isEmpty, isObject} from 'lodash'
import {fetchFullCountryTimeLineDataSuccess, fetchFullCountryTimeLineDataFail} from './actions';

function* fetchData() {
    try {
        let time_line_data = yield call(request, 'get', api.getTimeLine('full'));
        if (!isEmpty(time_line_data) && isObject(time_line_data)) {
            yield put(fetchFullCountryTimeLineDataSuccess(time_line_data))
        } else {
            yield put(fetchFullCountryTimeLineDataFail());
        }
    } catch (error) {
        yield put(fetchFullCountryTimeLineDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;