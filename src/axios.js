import axios from 'axios';
import { API_SETTING } from './env.conf';
import {  EXT_TOKEN } from './env.conf';


const expAuthToken = localStorage.getItem(EXT_TOKEN)
let extheader = { 'authkey': API_SETTING.authkey };
if (expAuthToken) {
  const et = JSON.parse(expAuthToken);
  extheader['Authorization'] = `Bearer ${et.token}`
}


export const extApi = axios.create({
  baseURL: API_SETTING.url,
  headers: extheader
});

export const api = axios.create({
  baseURL: API_SETTING.url,
});