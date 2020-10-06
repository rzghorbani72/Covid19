import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchTotalTimeLineData() {
    return {
        type:FETCH_DATA
    }
}
export function fetchTotalTimeLineDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchTotalTimeLineDataFail() {
    return {
        type:FETCH_FAIL
    }
}
