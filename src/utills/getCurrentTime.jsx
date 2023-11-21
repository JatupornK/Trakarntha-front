import moment from "moment";

const generateCurrentTime = () => {
  //just use moment no need to use moment timezone
  // Get the currenttime bangkok
  // const currentTime = moment().tz("Asia/Bangkok");
  // get gmt-7
  // currentTime.subtract(7, "hours");
  const isoTimestamp = moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  console.log(isoTimestamp)
  return isoTimestamp;
};

export { generateCurrentTime};
