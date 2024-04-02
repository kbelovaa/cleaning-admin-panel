import { isSameDay, parse } from 'date-fns';
import format from 'date-fns/format';

const formatDate = (dateString) => {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month - 1, day);

  const formattedDate = `${dateString}, ${format(date, 'EEEE')}`;

  return formattedDate;
};

const formatNotificationDate = (dateString) => {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month - 1, day);

  return [format(date, 'EEEE'), format(date, 'd'), format(date, 'MMMM')];
};

const getDateFromDateObject = (date) => {
  const formattedDate = date.slice(0, 10).split('-').reverse().join('.');
  return formattedDate;
};

const createDateObject = (dateString) => {
  const formattedDate = `${dateString.split('.').reverse().join('-')}T00:00:00.000+00:00`;
  return formattedDate;
};

const defineIsCleaningSoon = (date, time) => {
  const dateParts = date.split('.').map((elem) => Number(elem));
  const timeParts = time.split(':').map((elem) => Number(elem));

  const targetDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);

  const currentDate = new Date();

  const difference = targetDate.getTime() - currentDate.getTime();

  if (difference > 2 * 24 * 60 * 60 * 1000) {
    return false;
  }

  return true;
};

const filterTimes = (times) => {
  const now = new Date();

  const isLaterThanNow = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const timeToCompare = new Date();
    timeToCompare.setHours(parseInt(hours, 10));
    timeToCompare.setMinutes(parseInt(minutes, 10));

    return timeToCompare > now;
  };

  const filteredTimes = times.filter(isLaterThanNow);

  return filteredTimes;
};

const checkIsSameDate = (dateStr) => {
  const today = new Date();
  const date = parse(dateStr, 'dd.MM.yyyy', new Date());
  const result = isSameDay(today, date);

  return result;
};

export {
  formatDate,
  formatNotificationDate,
  getDateFromDateObject,
  createDateObject,
  defineIsCleaningSoon,
  filterTimes,
  checkIsSameDate,
};
