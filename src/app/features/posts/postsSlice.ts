import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Post, Reactions } from "../interfaces";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState: {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string | null;
} = {
  posts: [],
  status: "idle", //'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return [...response.data];
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: { userId: string; title: string; body: string }) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            userId,
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction }: { postId: string; reaction: string } =
        action.payload;
      const existingPost: Post | undefined = state.posts.find(
        (post) => post.id === postId
      );

      if (existingPost) {
        existingPost.reactions[reaction as keyof Reactions]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;

        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state: { posts: { posts: Post[] } }) =>
  state.posts.posts;
export const getPostsStatus = (state: { posts: { status: string } }) =>
  state.posts.status;
export const getPostsError = (state: {
  posts: { error: null | undefined | string };
}) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
