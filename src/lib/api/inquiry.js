import { generateQueryString } from '../util';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';
import axios from '../defaultClient';

export const loadInquiryListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  const url = `/survey/admin/list${queryString}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};

export const deleteInquiryAPI = (data) => {
  return axios.post('/survey/admin/remove', { indexs: data });
};

export const updateInquiryAPI = (data) => {
  return axios.post('/survey/admin/update', data);
};

export const loadInquiryByIdAPI = (index) => {
  const url = `/event/${index}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};