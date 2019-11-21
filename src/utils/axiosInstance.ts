import axiosBase, {AxiosInstance} from 'axios';
import Cookies from 'universal-cookie';
import {windowExist} from '@/index';

export type AxiosRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Create environment when do SSR
if (!windowExist) {
  require('dotenv').config();
}

const PRODUCTION_URL = 'https://dev.westay.vn/';

const ENV_DOMAIN = process.env.REACT_APP_DOMAIN;
const DOMAIN     = ((process.env.NODE_ENV == 'production') && !ENV_DOMAIN) ? PRODUCTION_URL : ENV_DOMAIN;
console.log(DOMAIN);
const ADMIN_URL           = DOMAIN + 'api/';
export const CUSTOMER_URL = DOMAIN + 'customer-api/';

const cookies = new Cookies();
const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + cookies.get('_token'),
  'Content-Language': 'en-EN',
};

const instance: AxiosInstance = axiosBase.create({
  baseURL: CUSTOMER_URL,
  withCredentials: true,
  headers,
});

export const axiosAdmin: AxiosInstance = axiosBase.create({
  baseURL: ADMIN_URL,
  headers,
});

export const axios = instance;
