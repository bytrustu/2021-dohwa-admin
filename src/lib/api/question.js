import { generateQueryString } from '../util';
import useSWR, { trigger } from 'swr';
import fetcher from '../fetcher';
import axios from '../defaultClient';

export const loadQuestionListAPI = (param = {}) => {
  const queryString = generateQueryString(param);
  const url = `/question/list${queryString}`;
  return {
    response: useSWR(url, fetcher, {revalidateOnFocus: false}),
    trigger: () => { trigger(url) }
  }
}

export const deleteQuestionAPI = (data) => {
  return axios.post('/question/remove', {indexs: data});
};

export const updateAnswerAPI = (data) => {
  return axios.post('/question/update', data);
};

export const loadQuestionByIdAPI = (index) => {
  const url = `/question/${index}`;
  return {
    response: useSWR(url, fetcher, {revalidateOnFocus: false}),
    trigger: () => { trigger(url) }
  }
}

export const sendEmailQuestionAPI = (data) => {
  return axios.post('/question/send_email', data);
};