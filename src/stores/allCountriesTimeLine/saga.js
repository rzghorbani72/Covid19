import {takeLatest, put, call, select} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchAllCountryTimeLineDataSuccess, fetchAllCountryTimeLineDataFail} from './actions';

function* fetchData() {
    try {
        let time_line_data = yield call(request, 'get', api.getAllCountriesTimeLineApi());
        if (!isEmpty(time_line_data) && isArray(time_line_data)) {
            yield put(fetchAllCountryTimeLineDataSuccess(time_line_data))
        } else {
            yield put(fetchAllCountryTimeLineDataFail());
        }
    } catch (error) {
        yield put(fetchAllCountryTimeLineDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;