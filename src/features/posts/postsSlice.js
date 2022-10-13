import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  try {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const { id } = post;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, post);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  const { id } = post;
  try {
    const respose = await axios.delete(`${POSTS_URL}/${id}`);
    if (respose?.status === 200) return post;
    return respose?.status;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
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
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        const newPost = { ...action.payload };
        newPost.userId = Number(action.payload.userId);
        newPost.data = new Date().toISOString();
        newPost.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(newPost);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          alert(action.payload);
          return;
        }

        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          alert(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectSinglePost = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectPostsByUser = (state, userId) =>
  state.posts.posts.filter((post) => post.userId === userId);

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
