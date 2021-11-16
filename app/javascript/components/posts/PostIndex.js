import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../posts/postSlice";
import Post from "./Post";
import PostHeader from "./PostHeader";
import Search from "./Search";

const PostIndex = (props) => {
  const filters = useSelector((state) => state.post.filters);
  const [sort, setSort] = useState("new");
  const postIds = useMemo(() => {
    const sortPosts = (sortFunc) =>
      [
        ...props.posts
          .filter((post) => {
            if (filters.title.length) {
              if (!post.name.match(filters.title)) return false;
            }

            for (const tag of filters.tags) {
              if (!post.tags.includes(tag)) return false;
            }
            return true;
          })
          .sort((a, b) => sortFunc(a, b)),
      ].map(({ id }) => id);

    if (sort) {
      switch (sort) {
        case "new":
          return sortPosts((a, b) =>
            new Date(a.posted) - new Date(b.posted)
              ? new Date(a.posted) - new Date(b.posted)
              : a.id - b.id
          );
        case "top":
          return sortPosts((a, b) => b.rating - a.rating);
        case "high-low":
          return sortPosts((a, b) => b.price - a.price);
        case "low-high":
          return sortPosts((a, b) => a.price - b.price);
      }
    }
  }, [props.posts, sort, filters.tags, filters.title]);
  const dispatch = useDispatch();
  useEffect(() => dispatch(addPosts(props.posts)), [dispatch, props.posts]);

  return (
    <React.Fragment>
      <PostHeader setSort={setSort} currentSort={sort}>
        <Search />
      </PostHeader>
      {postIds.map((id) => (
        <Post key={id} id={id} />
      ))}
    </React.Fragment>
  );
};

export default PostIndex;

PostIndex.propTypes = {
  posts: PropTypes.array.isRequired,
};
