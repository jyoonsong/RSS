import * as types from '../actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
    isLogged: false
};

function log(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN: 
            return {
                ...state,
                isLogged: true
            };
        case types.LOGOUT:
            return {
                ...state,
                isLogged: false
            };
        default:
            return state;
    }
};

export default log;