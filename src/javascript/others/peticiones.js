// ---Dependencys
import axios from 'axios';
// ---Others
import { ownerData } from 'Others/store-data.json';

const envType = process.env.NODE_ENV;

export const urlServer =
  envType === 'development'
    ? 'http://localhost:4000/'
    : `https://${ownerData.domain}:4000/`;
// export const urlServer = 'https://shelly-store.com:4000/';
// export const urlServer = 'http://localhost:4000/';

// -------------------------------------------Home---------------------------------------

export async function getHomePublic() {
  const endpoint = 'homeServices/getHomePublic';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
// -------------------------------------------MasterProductos---------------------------------------

export async function adminSearchProducts(data) {
  const endpoint = 'admin/productos/buscar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function getOneProduct(id) {
  const endpoint = 'admin/productos/';
  const url = urlServer + endpoint + id;
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function updateProductRequest(data) {
  const endpoint = 'admin/productos/editar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'put',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function createProductRequest(data) {
  const endpoint = 'admin/productos/registrar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function deleteProductRequest(id) {
  const endpoint = 'admin/productos/borrar/' + id;
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'delete',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
// -------------------------------------------Ordenes---------------------------------------
export async function createLocalOrder(data) {
  const endpoint = 'ordenes/ventaLocal';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function searchOrders(data) {
  const endpoint = 'ordenes/buscar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function cancelOrderRequest(id) {
  const endpoint = 'ordenes/cancelar/' + id;
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'delete',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function getOneOrder(id) {
  const endpoint = 'ordenes/' + id;
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
export async function updateOrder(data) {
  const endpoint = 'ordenes/editar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'put',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
// -------------------------------------------Utilidad---------------------------------------
export async function searchUtility(data) {
  const endpoint = 'utilities/buscar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

// -----------------------------------------Autenticación-------------------------------------
export async function logIn(data) {
  const endpoint = 'authentication/login';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function logOut() {
  const endpoint = 'authentication/logout';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function checkRoute(data) {
  const endpoint = 'users/routeAuth';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
// -----------------------------------------Cuentas-------------------------------------
export async function getAllUsers() {
  const endpoint = 'users/all';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getOneUser(data) {
  const endpoint = 'users/one';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(data) {
  const endpoint = 'users/borrar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'delete',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function createUserReq(data) {
  const endpoint = 'users/registrar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'post',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}

export async function editUserReq(data) {
  const endpoint = 'users/editar';
  const url = urlServer + endpoint;
  try {
    const respose = await axios(url, {
      method: 'put',
      data,
      withCredentials: true
    });
    return respose;
  } catch (error) {
    return error;
  }
}
// -------------------------------------------others----------------------------------------
export async function genericGet(url) {
  try {
    const respose = await axios(url, {
      method: 'get',
      withCredentials: false
    });
    return respose;
  } catch (error) {
    return error;
  }
}
