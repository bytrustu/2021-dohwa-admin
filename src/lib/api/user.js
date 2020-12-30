import axios from '../defaultClient';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';
import { generateQueryString } from '../util';

export const loadUserListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  const url = `/user/list${queryString}`;
  return {
    response: useSWR(url, fetcher, {revalidateOnFocus: false}),
    trigger: () => { trigger(url) }
  }
}

export const activeUsersAPI = (data) => {
  return axios.post('/user/auth/active', {indexs: data});
};

export const disabledUsersAPI = (data) => {
  return axios.post('/user/auth/disabled', {indexs: data});
};

export const adminUsersAPI = (data) => {
  return axios.post('/user/auth/admin', {indexs: data});
};

export const normalUsersAPI = (data) => {
  return axios.post('/user/auth/normal', {indexs: data});
};