import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchGlobeStatsData(code) {
    return {
        type:FETCH_DATA,
        payload:{code}
    }
}
export function fetchGlobeStatsDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchGlobeStatsDataFail() {
    return {
        type:FETCH_FAIL
    }
}
