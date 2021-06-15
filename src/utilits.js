import { createHashHistory} from 'history';
import { PAYMENT_URL, USER_TOKEN } from './env.conf';

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
