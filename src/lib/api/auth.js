import axios from '../defaultClient';
import useSWR from 'swr';
import fetcher from '../fetcher';

export const loadUser = () => {
  return axios.get('/user/auth/admin');
}

export const loginAPI = (data) => {
  data = {
    ...data,
    type: 'admin'
  }
  return axios.post('/user/login/admin', data);
};