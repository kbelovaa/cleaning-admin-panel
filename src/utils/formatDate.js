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

const calculateTimeLeft = (creationDate) => {
  const endDate = new Date(creationDate);
  endDate.setMinutes(endDate.getMinutes() + 15);

  const difference = +endDate - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return null;
  }

  return timeLeft;
};

export { formatDate, calculateTimeLeft };
