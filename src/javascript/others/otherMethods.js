export const priceFormat = number => {
  if (typeof number !== 'number') return '0';
  // A partir de un int o float genera un string con formato de precio ($1,000.00)
  let num = number;
  num = num.toFixed(2);
  num = num.toString(10);
  const max = num.length;

  const comaIndex = max - 6;
  const half1 = str => {
    let cadena = '';
    for (let i = 0; i < comaIndex; i++) {
      cadena += str[i];
    }
    return cadena;
  };
  const half2 = str => {
    let cadena = '';
    for (let i = comaIndex; i < max; i++) {
      cadena += str[i];
    }
    return cadena;
  };

  let finalNum;

  if (num.length > 6) {
    finalNum = '$' + half1(num) + ',' + half2(num);
  } else {
    finalNum = '$' + num;
  }
  return finalNum;
};

export const copyToEnd = (str, index) => {
  // Copia una cadena a partir del index indicado
  let copy = '';
  for (let i = index; i < str.length; i++) {
    copy += str[i];
  }
  return copy;
};

export const copyToIndex = (str, index) => {
  // Copia una cadena hasta el index indicado
  let copy = '';
  for (let i = 0; i <= index; i++) {
    copy += str[i];
  }
  return copy;
};

export const copyFromOneIndexToOther = (str, index1, index2) => {
  // Copia una cadena hasta el index indicado
  let copy = '';
  for (let i = index1; i <= index2; i++) {
    copy += str[i];
  }
  return copy;
};

export const findIndexArrayObj = (array, obj) => {
  const value = Object.values(obj)[0];
  const isValueEqual = element => element === value; // Criterio de búsqueda para un mapeo
  let i;
  let found = false;
  for (i = 0; i < array.length; i++) {
    const values = Object.values(array[i]);
    if (values.findIndex(isValueEqual) !== -1) {
      found = true;
      break;
    }
  }
  return found ? i : -1;
};

export const searchProductByID = (items, id) => {
  // Busca el index de un id específico en un array con key llamada "_id"
  let found = null;
  items.forEach((item, index) => {
    if (item._id === id) found = index;
  });
  return found;
};

export const getOneParam = cadena => {
  // obtiene el param de una url cuando sólo existe 1
  const indexStart = cadena.search(':');

  if (indexStart && indexStart !== -1) {
    const param = copyToEnd(cadena, indexStart + 1);
    return param;
  }
  return '';
};

export const getStringKey = cadena => {
  // obtiene el key de un string como "key: value"
  const indexFinish = cadena.search(':');

  if (indexFinish && indexFinish !== -1) {
    const key = copyToIndex(cadena, indexFinish - 1);
    return key;
  }
  return '';
};

export const isId = cadena => {
  // regex valida una palabra continua que sólo puede contener letras numeros y '-'
  return /^[0-9a-fA-F]{24}$/.test(cadena);
};

export function ignoreArgs(someObj, args) {
  const keys = Object.keys(someObj);
  const values = Object.values(someObj);
  let newData = {};
  let doCopy = true;

  keys.forEach((key, i) => {
    args.forEach(arg => {
      if (key === arg) {
        doCopy = false;
      }
    });
    newData = doCopy ? { ...newData, [key]: values[i] } : newData;
    doCopy = true;
  });
  return newData;
}
export function selectArgs(someObj, args) {
  const keys = Object.keys(someObj);
  const values = Object.values(someObj);
  let newData = {};
  let doCopy = false;

  keys.forEach((key, i) => {
    args.forEach(arg => {
      if (key === arg) {
        doCopy = true;
      }
    });
    newData = doCopy ? { ...newData, [key]: values[i] } : newData;
    doCopy = false;
  });
  return newData;
}

export function removeNullProperties(obj) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const hasProperties = value && Object.keys(value).length > 0;
    if (value === null || value === undefined) {
      delete obj[key];
    } else if (typeof value !== 'string' && hasProperties) {
      removeNullProperties(value);
    }
  });
  return obj;
}
export function removeEmptyAndNull(obj) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const hasProperties = value && Object.keys(value).length > 0;
    if (value === null || value === undefined || value === '') {
      delete obj[key];
    } else if (typeof value !== 'string' && hasProperties) {
      removeNullProperties(value);
    }
  });
  return obj;
}
export function removeBlankProperties(obj) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const hasProperties = value && Object.keys(value).length > 0;
    if (value === '') {
      delete obj[key];
    } else if (typeof value !== 'string' && hasProperties) {
      removeBlankProperties(value);
    }
  });
  return obj;
}

export function cloneObj(obj) {
  // console.log('cloneObj original: ', obj);
  let clone = [];
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    for (let i = 0; i < obj.length; i++) clone[i] = obj[i].clone();

    return clone;
  }

  if (typeof obj === 'object') {
    clone = {};
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    keys.forEach((element, index) => {
      clone[element] = values[index];
      // console.log('building clone...', clone);
    });

    return clone;
  }
  return obj;
}
