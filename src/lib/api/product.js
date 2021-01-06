import { generateQueryString } from '../util';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';

export const loadProductListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  const url = `/product/admin/list${queryString}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};

export const loadProductByIdAPI = (index) => {
  const url = `/product/${index}`;
  return {
    response: useSWR(url, fetcher, { revalidateOnFocus: false }),
    trigger: () => {
      trigger(url);
    },
  };
};