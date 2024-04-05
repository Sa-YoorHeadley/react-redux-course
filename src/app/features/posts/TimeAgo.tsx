import { parseISO, formatDistanceToNow } from "date-fns";

type Props = {
  timestamp: string;
  children?: React.ReactNode;
};

export default function TimeAgo({ timestamp }: Props) {
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date);
  const timeAgo = `${timePeriod} ago`;

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}
