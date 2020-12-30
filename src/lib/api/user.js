import axios from '../defaultClient';
import useSWR from 'swr';
import fetcher from '../fetcher';
import { generateQueryString } from '../util';

export const loadUserListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  return useSWR(`/user/list${queryString}`, fetcher);
}
