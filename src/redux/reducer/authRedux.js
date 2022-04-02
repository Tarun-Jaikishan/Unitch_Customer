import * as actionType from '../actiontype';

const initialState = {
    token: null,
    user_id: null,
    error: null,
    loading: false,
    is_customer: false,
    force_reset_password: false,
    pygt:false,
    user_details: {},
};


const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
}

const authSuccess = (state, { token, user }) => {
    return {
        token: token,
        user_id: user.id || null,
        user_details: user || {},
        is_customer: user.is_customer,
        force_reset_password : user.force_reset_password,
        pygt:user.pygt,
        error: null,
        loading: false
    };
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const authLogout = (state, action) => {
    return {
        token: null,
        user_id: null,
        error: null,
        loading: false,
        is_customer: false,
        force_reset_password: false,
        pygt:false,
        user_details: {},
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}


export default reducer;



