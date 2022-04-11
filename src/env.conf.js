import configData from './config.json';

export const SITE_SETTING = {
    company_name: configData.COMPANY_NAME,
    company_address: configData.COMPANY_ADDRESS,
    company_contact: { crm: configData.CRM_MOBILE_NO, supp: configData.CRM_SUPPORT_NO },
    company_email: configData.SUPPORT_EMAIL,
    company_logo: configData.COMPANY_LOGO,
    settings: configData.settings,
    dashboard_carousel: configData.DASHBOARD_CAROUSEL
};


export const API_SETTING = {
    url: configData.API_URL,
    front_url: configData.FRONT_URL,
    authkey: configData.AUTH_KEY,
    access_key: configData.ACCESS_KEY,
    aaauth_key: configData.AAUTH_KEY
}

export const BOUQUET_BASE = 1;
export const BOUQUET_ADDONS = 2;
export const BOUQUET_ALACARTE = 3;
export const PENDING_TICKET = 1;
export const OPEN_TICKET = 2;
export const CLOSED_TICKET = 3;

export const USER_AUTH_TOKEN = "user_auth_token";
export const USER_TOKEN = "user_token";
export const USER_DETAILS_STORAGE = "user";
export const EXT_TOKEN = "ext_token";
export const EXT_USER = "ext_user";
export const PAYMENT_URL = configData.ONLINE_PAYMENT_URL;
export const BACKURL = configData.PAYMENT_RETURN_URL;