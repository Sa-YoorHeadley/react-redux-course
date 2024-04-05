import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Post } from "../interfaces";

type Props = {
  post: Post;
  children?: React.ReactNode;
};

export default function PostsExcerpt({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>{post.body.substring(0, 100)}</p>
      </CardContent>
      <CardFooter>
        <ReactionButtons post={post} />
      </CardFooter>
    </Card>
  );
}
