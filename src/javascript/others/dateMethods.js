import moment from 'moment';

export function dateMongoToClient(someDate) {
  return moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('MMMM DD YYYY, hh:mm a');
}

export function dateMongoToClientShort(someDate) {
  return moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('MMMM DD YYYY');
}

export function dateFormToServer(someDate) {
  return moment(someDate)
    .add(5, 'hours')
    .locale('es')
    .format('YYYY-MM-DD');
}

export default null;
