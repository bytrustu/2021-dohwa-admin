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