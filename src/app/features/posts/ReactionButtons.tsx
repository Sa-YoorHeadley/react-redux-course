import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import { Post, Reactions } from "../interfaces";

type Props = {
  post: Post;
  children?: React.ReactNode;
};

export default function ReactionButtons({ post }: Props) {
  const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "❤",
    rocket: "🚀",
    coffee: "☕",
  };

  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <Button
          key={name}
          variant={"secondary"}
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name as keyof Reactions]}
        </Button>
      );
    }
  );

  return <div className="flex gap-4">{reactionButtons}</div>;
}
