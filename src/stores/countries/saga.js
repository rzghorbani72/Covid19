import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchCountriesDataSuccess, fetchCountriesDataFail} from './actions';

function* fetchData() {
    try {
        let countries_data = yield call(request, 'get', api.getCountriesCovid19Api());
        if (!isEmpty(countries_data) && isArray(countries_data)) {
            yield put(fetchCountriesDataSuccess(countries_data))
        } else {
            yield put(fetchCountriesDataFail());
        }
    } catch (error) {
        yield put(fetchCountriesDataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;