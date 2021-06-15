import * as actionType from '../actiontype';

const initialState = {
    profile: {},
    accounts: {},
    renewal: {
        bouquet_id: [],
        bouquets: { base: [], addon: [], alacarte: [] },
        rperiod_id: null,
        account_id: null
    },
    addons: {
        bouquet_id: [],
        bouquets: { addon: [], alacarte: [] },
        account_id: null,
        rperiod_id: null
    },
    loading: false,
    error: ""
}

const startCalling = (state, action) => {
    return {
        ...state,
        loading: true
    }
}
const endCalling = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const onError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const customer = (state, action) => {
    return {
        ...state,
        profile: action.profile,
        accounts: action.accounts
    }
}

const fetchBouquet = (state, action) => {
    return {
        ...state,
        renewal: {
            ...state.renewal,
            bouquet_id: action.bouquet_id,
            bouquets: action.bouquets,
            account_id: action.account_id
        }
    }
}

const fetchAddon = (state, action) => {
    return {
        ...state,
        addons: {
            ...state.addons,
            bouquets: action.bouquets,
            account_id: action.account_id
        }
    }
}

const addSelectedBouquet = (state, action) => {
    if (action.bouquet_id) {
        let bouquet_ids = action.is_renewal ? [...state.renewal.bouquet_id] : [...state.addons.bouquet_id];
        if (action.is_add) {
            bouquet_ids = [...bouquet_ids, action.bouquet_id];
        } else {
            bouquet_ids = bouquet_ids.filter(m => m !== action.bouquet_id);
        }
        if (action.is_renewal) {
            return {
                ...state,
                renewal: { ...state.renewal, bouquet_id: bouquet_ids }
            }
        } else {
            return {
                ...state,
                addons: {
                    ...state.addons,
                    bouquet_id: bouquet_ids
                }
            }
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AJAX_CALLING_START:
            return startCalling(state, action);
        case actionType.AJAX_CALLING_END:
            return endCalling(state, action);
        case actionType.AJAX_CALLING_FAILED:
            return onError(state, action);
        case actionType.ACCOUNT_DETAILS:
            return customer(state, action);
        case actionType.FETCH_BOUQUE:
            return fetchBouquet(state, action);
        case actionType.FETCH_ADDONS:
            return fetchAddon(state, action);
        case actionType.ADD_BOUQUE_ID:
            return addSelectedBouquet(state, action);
        default:
            return state;
    }
}

export default reducer;