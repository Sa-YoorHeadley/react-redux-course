import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Post } from "../interfaces";
import PostsExcerpt from "./PostsExcerpt";
import PostSkeleton from "./PostSkeleton";

import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { AppDispatch } from "@/app/store";

export default function PostsList() {
  const dispatch = useDispatch<AppDispatch>();
  const posts: Post[] = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;

  if (postsStatus === "loading") {
    content = <PostSkeleton />;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section className="w-1/2 flex flex-col gap-4">
      <h2 className="mb-4">Posts</h2>
      {content}
    </section>
  );
}
