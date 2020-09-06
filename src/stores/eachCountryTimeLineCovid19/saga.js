import {takeLatest, put, call} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../services/request';
import {api} from '../../services/api';
import {isEmpty, isArray} from 'lodash'
import {fetchEachCountryCovid19DataSuccess, fetchEachCountryCovid19DataFail} from './actions';

function* fetchData({payload:{country}}) {
    try {
        let time_line_data = yield call(request, 'get', api.getEachCountryTimeLineCovid19Api(country));
        if (!isEmpty(time_line_data) && isArray(time_line_data)) {
            yield put(fetchEachCountryCovid19DataSuccess(time_line_data))
        } else {
            yield put(fetchEachCountryCovid19DataFail());
        }
    } catch (error) {
        yield put(fetchEachCountryCovid19DataFail());
    }
}

export function* root() {
    yield takeLatest(FETCH_DATA, fetchData);
}

export default root;