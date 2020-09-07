import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchSummaryData() {
    return {
        type:FETCH_DATA
    }
}
export function fetchSummaryDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchSummaryDataFail() {
    return {
        type:FETCH_FAIL
    }
}
