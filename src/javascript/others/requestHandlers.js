// ---Dependencys
import { message } from 'antd';
// --Others
import history from 'Others/history';
// ---CommonComps
import ModalError from 'Utils/ModalError';

export function asyncHandler(
  requestFunction,
  successFunction,
  rejectFunction,
  requestData,
  successData
) {
  requestFunction(requestData || null).then(res => {
    if (res.response) {
      ModalError(
        'Error en la solicitud',
        res.response.data.errorType || 'Error en la petición'
      );
      rejectFunction(res.response.data);
      checkCredentials(res.response.data.badCredentials);
    } else {
      message.success('Solicitud exitosa');
      successFunction(res.data, successData || null);
    }
  });
}

function checkCredentials(badCredentials) {
  if (badCredentials) {
    history.push('/master/login');
    setTimeout(() => window.location.reload(), 1500);
  }
}

export function testSuccess(response) {
  console.log('testSuccess este:  --->', response);
}

export function testError(response) {
  console.log('testError este: --->', response);
  return null;
}
