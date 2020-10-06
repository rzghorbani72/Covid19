import {dev, prod} from '../env-config';

require('dotenv').config();

export const base_url_covid19api = `https://api.covid19api.com`
export const base_url_local = process.env.REACT_APP_ENV === 'production' ? prod.REACT_APP_BACKEND_URL : dev.REACT_APP_BACKEND_URL