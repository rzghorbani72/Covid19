import {takeLatest, put, call, select} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray, take} from 'lodash'
import {fetchEachCountryTimeLineDataSuccess, fetchEachCountryTimeLineDataFail} from './actions';

function* fetchData({payload:{code}}) {
    try {
        let time_line_data = yield call(request, 'get', api.getEachCountryTimeLineApi(code));
        if (!isEmpty(time_line_data) && isArray(time_line_data)) {
            yield put(fetchEachCountryTimeLineDataSuccess(time_line_data))
        } else {
            yield put(fetchEachCountryTimeLineDataFail());
        }
    } catch (error) {
        yield put(fetchEachCountryTimeLineDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;