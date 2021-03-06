import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import _ from 'lodash'
import {fetchSummaryDataSuccess, fetchSummaryDataFail} from './actions';

function* fetchData() {
    try {
        let summary_data = yield call(request, 'get', api.getSummaryCovid19Api());
        if (!_.isEmpty(summary_data) && _.isObject(summary_data)) {
            yield put(fetchSummaryDataSuccess(summary_data))
        } else {
            yield put(fetchSummaryDataFail());
        }
    } catch (error) {
        yield put(fetchSummaryDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;