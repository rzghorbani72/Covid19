import {takeLatest, put, call, select} from 'redux-saga/effects'
import {FETCH_DATA} from './types'
import {request} from '../../../services/request';
import {api} from '../../../services/api';
import {isEmpty, isArray, take} from 'lodash'
import {fetchEachCountryTimeLineDataSuccess, fetchEachCountryTimeLineDataFail} from './actions';

function* fetchData() {
    try {
        let objective_data = yield call(request, 'get', api.getCardList());
        if (!isEmpty(objective_data) && isArray(objective_data)) {
            yield put(fetchEachCountryTimeLineDataSuccess(cards))
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