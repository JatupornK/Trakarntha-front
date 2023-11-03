import moment from 'moment-timezone';

const generateCurrentTime = () => {
    // Get the current time in 'Asia/Bangkok' time zone
    const currentTime = moment().tz('Asia/Bangkok');
    // Subtract 7 hours to get the time in GMT-7
    currentTime.subtract(7, 'hours');
    // Format the time as an ISO 8601 string with milliseconds and 'Z'
    const isoTimestamp = currentTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
    return isoTimestamp;
}

export {generateCurrentTime}