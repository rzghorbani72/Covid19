import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchProvinceGeoDataSuccess, fetchProvinceGeoDataFail} from './actions';

function* fetchData() {
    try {
        let province_geo_data = yield call(request, 'get', api.getProvinceLatLangApi());
        if (!isEmpty(province_geo_data) && isArray(province_geo_data)) {
            yield put(fetchProvinceGeoDataSuccess(province_geo_data))
        } else {
            yield put(fetchProvinceGeoDataFail());
        }
    } catch (error) {
        yield put(fetchProvinceGeoDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;