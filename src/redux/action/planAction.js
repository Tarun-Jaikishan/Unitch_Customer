import { extApi } from '../../axios';
import * as actionType from '../actiontype';
import { isTokenValid, RemoveTokens } from '../../utilits';
import { API_SETTING, EXT_TOKEN } from '../../env.conf';

export const bouquetStart = (props) => {
    return {
        type: actionType.BOUQUET_START
    };
}

export const bouquetError = (error) => {
    let message = "";
    for (const property in error) {
        message = `${message}. ${property}: ${error[property].join(' ')}`;
    }

    return {
        type: actionType.BOUQUET_FAIL,
        error: message
    };
}

export const bouquetSuccess = (bouquet) => {
    return {
        type: actionType.BOUQUET_SUCCESS,
        bouquet: bouquet
    };
}

export const bouquet = () => {
    return dispatch => {
        dispatch(bouquetStart());
        const token = isTokenValid(EXT_TOKEN);
        if (token) {
            const url = `/bouque/list?fields=sort_by,id,name,description,mrp,type,brd_type,ifFixNCF&expand=type_lbl,boxtype_lbl,name_lbl,alacarte,package,name_lbl,brd_type_lbl,brd_type&filter[is_online_app]=1`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }

            extApi.get(url, { headers: headers })
                .then(response => {
                    if (response.data) {
                        const data = arrangeBouquets(response.data.data);
                        dispatch(bouquetSuccess(data));
                    }
                }).catch(err => {
                    if (err.response) {
                        if (err.response.data.status === 401) {
                            RemoveTokens(false);
                        }
                    } else {
                        dispatch(bouquetError(err));
                    }
                });
        }
    };
}

export const arrangeBouquets = (bouquetsData) => {
    let b = { base: [], addon: [], alacarte: [] };
    for (let bouquets in bouquetsData) {
        let bq = bouquetsData[bouquets];
        const d = {
            name: bq.name_lbl,
            display_type: bq.boxtype_lbl,
            description: bq.description,
            type: bq.type,
            package: bq.package,
            alacarte: bq.alacarte,
            mrp: bq.mrp,
            id: bq.id
        };

        if (bq.type === 1) {
            b.base.push(d);
        } else if (bq.type === 2) {
            b.addon.push(d);
        } else {
            b.alacarte.push(d);
        }
    }
    return b;
}