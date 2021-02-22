import * as actionType from '../actiontype';

const initialState = {
    bouquet: [],
    loading: false,
    error: null
};

const bouquetStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
}

const bouquetSuccess = (state, action) => {
    return {
        bouquet: action.bouquet,
        loading: false,
        error: null
    };
}

const bouquetError = (state, action) => {
    return {
        bouquet: [],
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.BOUQUET_START:
            return bouquetStart(state, action);
        case actionType.BOUQUET_SUCCESS:
            return bouquetSuccess(state, action);
        case actionType.BOUQUET_FAIL:
            return bouquetError(state, action);
        default:
            return state
    }
}

export default reducer;