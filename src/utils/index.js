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