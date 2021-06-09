/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { copyToEnd, copyToIndex } from 'Others/otherMethods';
import { genericGet } from 'Others/peticiones';

const initialItem = {
  origen: 'Mercado Libre',
  seller: {},
  images: {
    extra: ['', '', '']
  }
};

async function superMLhandler(referenceML) {
  const itemAPIurl = buildMLurlAPI(referenceML);

  const responseMain = await genericGet(itemAPIurl);
  if (responseMain.response) {
    // Si hay un error
    console.log('url o id no compatible: ');
    return initialItem;
  }
  const { data } = responseMain;

  const hardItemValues = await getValuesFromOtherApis(data, itemAPIurl);
  const basicItemValues = getItemValues(data);

  const newItem = {
    ...initialItem,
    ...basicItemValues,
    ...hardItemValues
  };

  // console.log('newItem ', newItem);
  return newItem;
}

export default superMLhandler;

async function getValuesFromOtherApis(data, originalUrl) {
  const { seller_id, category_id } = data;
  const sellerAPIurl = `https://api.mercadolibre.com/users/${seller_id}`;
  const categoryAPIurl = `https://api.mercadolibre.com/categories/${category_id}`;
  const detailsAPIurl = `${originalUrl}/description`;

  const resSeller = await genericGet(sellerAPIurl);
  const resCategory = await genericGet(categoryAPIurl);
  const resDetails = await genericGet(detailsAPIurl);

  const descripcion = resDetails.data ? resDetails.data.plain_text : '';
  const shortMicro = handleCategory(resCategory.data.path_from_root);
  const seller = {
    idMercadoLibre: resSeller.data.id.toString(),
    name: resSeller.data.nickname
  };

  // return { descripcion, shortMicro, seller };
  return { descripcion };
}

function handleCategory(catArray) {
  const indexOfLast = catArray.length - 1;
  return catArray[indexOfLast].name;
}

function buildMLurlAPI(referenceML) {
  const url = 'https://api.mercadolibre.com/items/';
  if (referenceML.length > 15) {
    console.log('el ID es: ', getIDfromLink(referenceML));
    return url + getIDfromLink(referenceML);
  }

  return url + referenceML;
}

function getIDfromLink(cadena) {
  let startIndex = cadena.search('-') + 1;
  let id = copyToEnd(cadena, startIndex);
  console.log('cadena 1: ', id);
  startIndex = id.search('-') - 1;
  id = copyToIndex(id, startIndex);
  return `MLM${id}`;
}

function getItemValues(data) {
  // eslint-disable-next-line prettier/prettier
  const { title, price, available_quantity, warranty, secure_thumbnail, id, permalink, pictures } = data;
  const itemValues = {
    nombre: title,
    costo: price,
    // precio: (parseFloat(price) * 1.15 + 5).toFixed(2),
    // disponibles: available_quantity,
    // garantia: warranty,
    images: handleImages(pictures, secure_thumbnail)
    // idMercadoLibre: id,
    // mlURL: permalink
  };

  return itemValues;
}

function handleImages(pictures, mini) {
  if (pictures.length >= 4) {
    return {
      cover: pictures[0].secure_url,
      mini,
      extra: [
        pictures[1].secure_url,
        pictures[2].secure_url,
        pictures[3].secure_url
      ]
    };
  }
  if (pictures.length === 3) {
    return {
      cover: pictures[0].secure_url,
      mini,
      extra: [
        pictures[1].secure_url,
        pictures[2].secure_url,
        pictures[0].secure_url
      ]
    };
  }
  if (pictures.length === 2) {
    return {
      cover: pictures[0].secure_url,
      mini,
      extra: [
        pictures[1].secure_url,
        pictures[1].secure_url,
        pictures[1].secure_url
      ]
    };
  }
  if (pictures.length === 1) {
    return {
      cover: pictures[0].secure_url,
      mini,
      extra: [
        pictures[0].secure_url,
        pictures[0].secure_url,
        pictures[0].secure_url
      ]
    };
  }
}
