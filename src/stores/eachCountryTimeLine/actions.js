import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchEachCountryTimeLineData(code) {
    return {
        type:FETCH_DATA,
        payload:{code}
    }
}
export function fetchEachCountryTimeLineDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchEachCountryTimeLineDataFail() {
    return {
        type:FETCH_FAIL
    }
}
