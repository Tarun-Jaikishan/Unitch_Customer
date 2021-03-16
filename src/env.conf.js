
export const SITE_SETTING = {
    company_name: window.Configs.COMPANY_NAME,
    company_address: window.Configs.COMPANY_ADDRESS,
    company_contact: { crm: window.Configs.CRM_MOBILE_NO, supp: window.Configs.CRM_SUPPORT_NO },
    company_email: window.Configs.SUPPORT_EMAIL,
    company_logo : window.Configs.COMPANY_LOGO
};


export const API_SETTING = {
    url: window.Configs.API_URL,
    authkey: window.Configs.AUTH_KEY,
    username: window.Configs.USERNAME,
    password: window.Configs.PASSWORD
}

export const BOUQUET_BASE = 1;
export const BOUQUET_ADDONS = 2;
export const BOUQUET_ALACARTE = 3;
export const OPEN_TICKET = 2;
export const CLOSED_TICKET = 3;

export const USER_AUTH_TOKEN = "user_auth_token";
export const USER_TOKEN = "user_token";
export const USER_DETAILS_STORAGE = "user";
export const EXT_TOKEN = "ext_token";
export const EXT_USER = "ext_user";
export const PAYMENT_URL =window.Configs.ONLINE_PAYMENT_URL;
export const BACKURL = window.Configs.PAYMENT_RETURN_URL;