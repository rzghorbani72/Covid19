import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../../services/request';
import {api} from '../../../services/api';
import {isEmpty, isObject} from 'lodash'
import {fetchTotalTimeLineDataSuccess, fetchTotalTimeLineDataFail} from './actions';

function* fetchData() {
    try {
        let time_line_data = yield call(request, 'get', api.getTimeLine('total'));
        if (!isEmpty(time_line_data) && isObject(time_line_data)) {
            yield put(fetchTotalTimeLineDataSuccess(time_line_data))
        } else {
            yield put(fetchTotalTimeLineDataFail());
        }
    } catch (error) {
        yield put(fetchTotalTimeLineDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;