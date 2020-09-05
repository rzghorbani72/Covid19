import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchAllCountryTimeLineData(code) {
    return {
        type:FETCH_DATA,
        payload:{code}
    }
}
export function fetchAllCountryTimeLineDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchAllCountryTimeLineDataFail() {
    return {
        type:FETCH_FAIL
    }
}
