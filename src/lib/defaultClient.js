import axios from 'axios';
import config from './config';

const { SERVER_URL, LOCAL_URL } = config;
const defaultClient = axios.create({
  baseURL : process.env.NODE_ENV === 'production' ? `${SERVER_URL}/api` : `${LOCAL_URL}/api`,
  withCredentials: true,
});

if (process.env.NODE_ENV === 'production') {
  defaultClient.defaults.timeout = 3000;
}

export default defaultClient;