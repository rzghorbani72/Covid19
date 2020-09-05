import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchRegionsIsoNameDataSuccess, fetchRegionsIsoNameDataFail} from './actions';

function* fetchData({payload:{code}}) {
    try {
        let region_iso_data = yield call(request, 'get', api.getRegionsIsoNameApi(code));
        if (!isEmpty(region_iso_data) && isArray(region_iso_data)) {
            yield put(fetchRegionsIsoNameDataSuccess(region_iso_data))
        } else {
            yield put(fetchRegionsIsoNameDataFail());
        }
    } catch (error) {
        yield put(fetchRegionsIsoNameDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;