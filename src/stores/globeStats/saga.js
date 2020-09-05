import {takeLatest, put, call, select} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchGlobeStatsDataSuccess, fetchGlobeStatsDataFail} from './actions';

function* fetchData() {
    try {
        let globe_stats_data = yield call(request, 'get', api.getGlobeStatsApi());
        if (!isEmpty(globe_stats_data) && isArray(globe_stats_data)) {
            yield put(fetchGlobeStatsDataSuccess(globe_stats_data))
        } else {
            yield put(fetchGlobeStatsDataFail());
        }
    } catch (error) {
        yield put(fetchGlobeStatsDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;