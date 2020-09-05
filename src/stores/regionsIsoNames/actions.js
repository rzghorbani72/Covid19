import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchRegionsIsoNameData(code) {
    return {
        type:FETCH_DATA,
        payload:{code}
    }
}
export function fetchRegionsIsoNameDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchRegionsIsoNameDataFail() {
    return {
        type:FETCH_FAIL
    }
}
