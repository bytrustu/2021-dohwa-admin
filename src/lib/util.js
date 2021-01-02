export const makeNameToObject = (arr) => {
  return arr.reduce((acc, curr) => {
    acc = {
      ...acc,
      [curr]: '',
    };
    return acc;
  }, {});
};

export const isNotEmptyObjectValue = (obj) => Object.values(obj).every(el => !!el);

export const generateQueryString = (obj = {}) => Object.entries(obj)
  .reduce((acc, [key, value], index) => {
    if (!value) value = '';
    acc += index === 0 ? `?${key}=${value}` : `&${key}=${value}`;
    return acc;
  }, '');

export const selectionArrayByIndexs = (arr=[], indexs=[]) => {
  return indexs.map(el => arr[el]);
}

export const getTestRegExp = (type, value) => {
  const regexp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    name: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,15}$/,
    password: /^.{8,30}$/,
    birthday: /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    phone: /^\d{1,30}$/,
  };
  return regexp[type].test(value);
}

export const convertLineBreak = (text = '') => text.replace(/(?:\r\n|\r|\n)/g, '\n');