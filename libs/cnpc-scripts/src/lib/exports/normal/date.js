function timeElapsed(ts, time) {
  if (!time) {
    tume = '10sec';
  }
  if (!ts) {
    return false;
  }
  time = {
    length: parseInt(time),
    type: time.split(parseInt(time))[1].toLocaleLowerCase(),
    dnow: Date.now(),
  };
  switch (time.type) {
    case 'sec':
      time.length *= 1000;
      break;
    case 'min':
      time.length *= 60000;
      break;
    case 'hrs':
      time.length *= 3600000;
      break;
    case 'days':
      time.length *= 86400000;
      break;
    case 'mon':
      time.length *= 2592000000;
      break;
    case 'yrs':
      time.length *= 31104000000;
      break;
  }
  return ts + time.length - time.dnow < 0;
}
