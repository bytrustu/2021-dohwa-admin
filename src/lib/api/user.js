import axios from '../defaultClient';
import useSWR from 'swr';
import fetcher from '../fetcher';
import { generateQueryString } from '../util';

export const loadUserList = (param = {}) => {
  const queryString = generateQueryString(param);
  console.log(`loadUSerList =>`, param);
  return useSWR(`/user/list${queryString}`, fetcher)
}