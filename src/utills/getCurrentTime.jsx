import moment from "moment-timezone";

const generateCurrentTime = () => {
  // Get the current time in 'Asia/Bangkok' time zone
  const currentTime = moment().tz("Asia/Bangkok");
  // Subtract 7 hours to get the time in GMT-7
  currentTime.subtract(7, "hours");
  // Format the time as an ISO 8601 string with milliseconds and 'Z'
  const isoTimestamp = currentTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return isoTimestamp;
};

const getTimeStamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  now.setHours(hours, minutes, seconds);
  const timestamp = Math.floor(now.getTime() / 1000);
  return timestamp;
};

export { generateCurrentTime, getTimeStamp };
