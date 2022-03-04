import { api } from '../../axios';
import * as actionType from '../actiontype';
import { BOUQUET_ADDONS, BOUQUET_ALACARTE, BOUQUET_BASE, USER_TOKEN, API_SETTING } from '../../env.conf';
import { RemoveTokens, isTokenValid } from '../../utilits';

export const startCalling = (props) => {
    return {
        type: actionType.AJAX_CALLING_START
    };
}

export const endCalling = (props) => {
    return {
        type: actionType.AJAX_CALLING_END
    }
}

export const onError = (error) => {
    let message = "";
    if (error.response.status === 401) {
        console.log("on Error called", error.response);
        RemoveTokens(true);
    }

    for (const property in error) {
        console.log("error details", property, error[property]);
        //message = `${message}. ${property}: ${error[property].join(' ')}`;
    }

    return {
        type: actionType.AJAX_CALLING_FAILED,
        error: message
    };
}

export const customer = (accounts, profile) => {
    return {
        type: actionType.ACCOUNT_DETAILS,
        accounts: accounts,
        profile: profile
    }
}

export const fetchBouquet = (bouquets, bouquet_id, account_id) => {
    return {
        type: actionType.FETCH_BOUQUE,
        bouquet_id: bouquet_id,
        bouquets: bouquets,
        account_id: account_id
    }
}

export const fetchAddon = (bouquets, account_id) => {
    return {
        type: actionType.FETCH_ADDONS,
        bouquets: bouquets,
        account_id: account_id
    }
}


export const fetchAccounts = () => {

    return dispatch => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            dispatch(startCalling());
            const ls_data = localStorage.getItem('user');
            const user = JSON.parse(ls_data);
            const url = `subscriber/profile/${user.id}`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url, { headers })
                .then(resp => {
                    if (resp.data.success) {
                        const d = resp.data.data;
                        dispatch(customer(d.accounts, d.profile));
                    }
                }).catch(err => {
                    console.log(err);
                    //dispatch(onError(err));
                });
        } else {
            RemoveTokens(true);
        }
    }
}

export const fetchBouquets = (bouque_ids, account_id) => {
    return dispatch => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            dispatch(startCalling());
            const url = `bouque/list?fields=sort_by,id,name,description,mrp,type,brd_type,ifFixNCF&expand=type_lbl,boxtype_lbl,name_lbl,alacarte,package,name_lbl,brd_type_lbl,brd_type&filter[is_online_app]=1&filter[id]=${bouque_ids.join(',')}`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url, { headers })
                .then(resp => {
                    if (resp.data.success) {
                        const d = resp.data.data;
                        const bouquets = { base: [], addon: [], alacarte: [] };
                        const bouquet_id = d.map(b => b.id);
                        bouquets.base = d.filter(b => b.type === BOUQUET_BASE);
                        bouquets.addon = d.filter(b => b.type === BOUQUET_ADDONS);
                        bouquets.alacarte = d.filter(b => b.type === BOUQUET_ALACARTE);
                        dispatch(fetchBouquet(bouquets, bouquet_id, account_id));
                    }
                }).catch(err => {
                    console.log(err);
                    dispatch(onError(err));
                });
        } else {
            RemoveTokens(true);
        }
    }
}

export const fetchAddons = (account_id) => {
    return dispatch => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            dispatch(startCalling());
            const url = `bouque/list?fields=id,name,description,mrp,type&expand=type_lbl,boxtype_lbl,name_lbl,alacarte,package&notfilter[account_id]=${account_id}&notfilter[type]=1&filter[is_online_app]=1`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }

            api.get(url, { headers })
                .then(resp => {
                    if (resp.data.success) {
                        const d = resp.data.data;
                        const bouquets = { addons: [], alacarte: [] };
                        bouquets.addon = d.filter(b => b.type === BOUQUET_ADDONS);
                        bouquets.alacarte = d.filter(b => b.type === BOUQUET_ALACARTE);
                        dispatch(fetchAddon(bouquets, account_id));
                    }
                }).catch(err => {
                    console.log(err);
                    dispatch(onError(err));
                });
        } else {
            RemoveTokens();
        }
    }
}

export const addSelectedBouquet = (bouquet_id, is_add, is_renewal) => {
    return dispatch => {
        const req = {
            type: actionType.ADD_BOUQUE_ID,
            bouquet_id: bouquet_id,
            is_add: is_add,
            is_renewal: is_renewal
        }
        dispatch(req);
    }
}