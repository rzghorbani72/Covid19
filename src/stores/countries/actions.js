import {
    FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL
} from './types';

export function fetchCountriesData() {
    return {
        type:FETCH_DATA,
    }
}
export function fetchCountriesDataSuccess(data) {
    return {
        type:FETCH_SUCCESS,
        payload:data
    }

}
export function fetchCountriesDataFail() {
    return {
        type:FETCH_FAIL
    }
}
