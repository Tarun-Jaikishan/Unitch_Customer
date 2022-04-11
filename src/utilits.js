import { createHashHistory } from 'history';
import { PAYMENT_URL, USER_TOKEN, USER_DETAILS_STORAGE, USER_AUTH_TOKEN } from './env.conf';
import { Redirect } from 'react-router'

export const RemoveTokens = (is_customer) => {
    if (is_customer) {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
    } else {
        localStorage.removeItem('ext_token');
        localStorage.removeItem('ext_user');
    }
    history.push('/');
}

export const history = createHashHistory();//createBrowserHistory();

export const FormErrorDisplay = ({ error }) => <div className="invalid-feedback">{error}</div>;

export const isExtTokenValid = () => {
    const token = localStorage.getItem('ext_token');
    if (!token) return false;

    const t = JSON.parse(token);
    // console.log('parse tokenss...', t);
    return calculateTokenExpiry(t.time)
}

const calculateTokenExpiry = (token_time) => {
    const startTime = new Date(token_time);
    const endTime = new Date();
    const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    const resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes < 10;
}

export const extToken = () => {
    const token = localStorage.getItem('ext_token');
    if (token) {
        const t = JSON.parse(token);
        return t.token;
    }
    return false;
}

export const isTokenValid = (type) => {

    const token = localStorage.getItem(type);
    if (!token) return false;

    const t = JSON.parse(token);
    //  console.log('parse tokenss...', t);
    const is_valid = calculateTokenExpiry(t.time);
    if (is_valid) {
        localStorage.setItem(type, JSON.stringify({ ...t, time: new Date() }))
    }
    return is_valid ? t.token : false;
}

export const getPaymentUrl = () => {
    const t = isTokenValid(USER_TOKEN);
    return PAYMENT_URL + '&pa=' + t;
}

export const matchString = (str, matchSrt) => {
    return str.toLowerCase().indexOf(matchSrt.toLowerCase()) > -1;
}

export const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER_DETAILS_STORAGE);
    localStorage.removeItem(USER_AUTH_TOKEN);
    <Redirect to="/" />
}

export const isString = (value) => (typeof value === 'string' || value instanceof String);
export const isNumeric = (value) => !isNaN(value);
export const isNumericGTZero = (value) => !isNaN(value) && parseInt(value) > 0;
export const isAlphaNumeric = (value) => value.match(/^[\w\-\s]+$/);
export const isaDate = (value) => {
    var d = new Date(value);
    return (d instanceof Date);
}
export const isEmail = (value) => String(value)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const showErrorMessage = (error) => {
    let message='';
    for (const property in error.data.message) {
        message = `${message} ${error.data.message[property].join(' ')}.`;
        //console.log("Error message", error[property]);
    }
    return message;
}
