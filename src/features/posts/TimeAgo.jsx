import { formatDistanceToNow, parseISO } from "date-fns";

const TimeAgo = ({ timeStamp }) => {
  let timeAgo = "";
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    console.log(timeStamp, date, timePeriod);
    timeAgo = timePeriod + " ago";
  }
  return (
    <span title="timestamp">
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
