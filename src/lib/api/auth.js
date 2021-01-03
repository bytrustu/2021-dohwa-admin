import axios from '../defaultClient';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';
import { generateQueryString } from '../util';

export const loadUserAPI = () => {
  return axios.get('/user/auth/admin');
}

export const loginAPI = (data) => {
  data = {
    ...data,
    type: 'admin'
  }
  return axios.post('/user/admin/login', data);
};

export const signupAPI = (data) => {
  data = {
    ...data,
    type: 'admin'
  }
  return axios.post('/user/admin/signup', data);
};

export const loadUserListAPI = () => {
  const url = `/user/admin/load`;
  return {
    response: useSWR(url, fetcher, {revalidateOnFocus: false}),
    trigger: () => { trigger(url) }
  }
}