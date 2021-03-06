import {FETCH_DATA,FETCH_SUCCESS,FETCH_FAIL} from './types';
const initialState = {
    data: {},
    loading: false
};

export default function totalTimeLine(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                data:action.payload,
                loading: false
            }
        case FETCH_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
};