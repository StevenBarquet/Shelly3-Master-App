// ---Dependencys
import { message } from 'antd';
// ---CommonComps
import ModalError from 'CommonComps/ModalError';

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
        res.response.data.result.errorType || res.response.data
      );
      rejectFunction(res.response.data);
    } else {
      message.success('Solicitud exitosa');
      successFunction(res.data, successData || null);
    }
  });
}

export function testSuccess(response) {
  console.log('testSuccess este:  --->', response);
}

export function testError(response) {
  console.log('testError este: --->', response);
  return null;
}
