import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

type Props = {
  userId: string | undefined;
  children?: React.ReactNode;
};

export default function PostAuthor({ userId }: Props) {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
}
