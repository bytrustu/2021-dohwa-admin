import { generateQueryString } from '../util';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';
import axios from '../defaultClient';

export const loadEventListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  const url = `/event/list${queryString}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};

export const deleteEventAPI = (data) => {
  return axios.post('/event/remove', { indexs: data });
};

export const submitEventAPI = (data) => {
  return axios.post('/event/upload', data);
};

export const updateEventAPI = (data) => {
  return axios.post('/event/update', data);
};

export const loadEventByIdAPI = (index) => {
  const url = `/event/${index}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};