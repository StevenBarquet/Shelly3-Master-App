import moment from 'moment';

export function dateMongoToClient(someDate) {
  return moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('MMMM DD YYYY, hh:mm a');
}

export function dateMongoToHours(someDate) {
  const formatS = moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('hh:mm A');
  return formatS;
}

export function dateMongoToDays(someDate) {
  const formatS = moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('DD');
  return formatS;
}

export function dateMongoToWeekDays(someDate) {
  const formatS = moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('dddd');
  return formatS;
}

export function dateMongoToMonths(someDate) {
  const formatS = moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('MMMM');
  return formatS;
}

export function dateMongoToClientShort(someDate) {
  return moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    .add(5, 'hours')
    .locale('es')
    .format('MMMM DD YYYY');
}

export function dateMongoToMoment(someDate) {
  const formatS = moment(someDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  return formatS;
}

export function dateFormToServer(someDate) {
  return moment(someDate)
    .locale('es')
    .format('YYYY-MM-DD');
}

export function dateFormToServerFull(someDate) {
  return moment(someDate)
    .locale('es')
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
}

export function dateFormToWeekStartEnd(formDate) {
  const someDay = moment(formDate._d);
  const startDay = someDay.startOf('isoWeek').toString();
  const finalDay = someDay.endOf('isoWeek').toString();
  const startDate = {
    ...moment(startDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  const finalDate = {
    ...moment(finalDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  return { startDate, finalDate };
}
export function dateFormToMonthStartEnd(formDate) {
  const someDay = moment(formDate._d);
  const startDay = someDay.startOf('month').toString();
  const finalDay = someDay.endOf('month').toString();
  const startDate = {
    ...moment(startDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  const finalDate = {
    ...moment(finalDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  return { startDate, finalDate };
}
export function dateFormToYearStartEnd(formDate) {
  const someDay = moment(formDate._d);
  const startDay = someDay.startOf('year').toString();
  const finalDay = someDay.endOf('year').toString();
  const startDate = {
    ...moment(startDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  const finalDate = {
    ...moment(finalDay, 'ddd MMM DD YYYY HH:mm:ss GMT-0500')
  };
  return { startDate, finalDate };
}

export default null;
