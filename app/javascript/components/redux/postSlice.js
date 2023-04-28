import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

const postAdapter = createEntityAdapter();
const postInitialState = postAdapter.getInitialState();
const tagAdapter = createEntityAdapter();
const tagInitialState = tagAdapter.getInitialState();
const authenticityToken = document.querySelector(
  'meta[name="csrf-token"]'
).content;
const generateSearchString = ({ sort, tags, title }) =>
  `sort_order=${sort}${tags.length ? "&tags[]=" + tags.join("&tags[]=") : ""}${
    title.length ? "&title=" + title : ""
  }`;
const isUserShowRoute = document.location.toString().includes("/user/");

export const postSlice = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: window.location.origin,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("X-CSRF-Token", authenticityToken);
      return headers;
    },
  }),
  tagTypes: ["Post", "Tag"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ sort, tags, title, userName }) =>
        `${
          isUserShowRoute ? "/user/" + userName : "/posts"
        }?${generateSearchString({ sort, tags, title })}`,
      transformResponse: (responseData) =>
        postAdapter.upsertMany(postInitialState, responseData),
      providesTags: ["Post"],
    }),
    getTags: builder.query({
      query: () => `/tags${isUserShowRoute ? "?use_current_user=true" : ""}`,
      transformResponse: (responseData) =>
        tagAdapter.upsertMany(tagInitialState, responseData),
      providesTags: ["Tag"],
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}/edit?${new URLSearchParams(data).toString()}`,
        method: "GET",
      }),
      invalidatesTags: ["Post", "Tag"],
    }),
    likePost: builder.mutation({
      query: ({ id, voteType, method }) => ({
        url: `/votes?${new URLSearchParams({
          post_id: id,
          vote_type: voteType,
        }).toString()}`,
        method,
      }),
      invalidatesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/posts?${new URLSearchParams(data).toString()}`,
        method: "POST",
      }),
      invalidatesTags: ["Post", "Tag"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetTagsQuery,
  useUpdatePostMutation,
  useLikePostMutation,
  useCreatePostMutation,
} = postSlice;
