import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../posts/postSlice";
import Post from "./Post";
import PostHeader from "./PostHeader";
import Search from "./Search";
import { setUserName } from "../users/userSlice";
import NavCreatePost from "./NavCreatePost";

const PostIndex = (props) => {
  const filters = useSelector((state) => state.post.filters);
  const posts = useSelector((state) => state.post);
  const [sort, setSort] = useState("new");
  const postIds = useMemo(() => {
    const postData = Object.values(posts).filter((post) => post?.id);
    if (!postData.length) return [];
    const sortPosts = (sortFunc) =>
      [
        ...postData
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
  }, [sort, filters.tags, filters.title, posts]);
  const dispatch = useDispatch();
  const currentUserName = useSelector((state) => state.user.name);
  useEffect(() => {
    dispatch(addPosts(props.posts));
    dispatch(setUserName(props.userName));
  }, [dispatch, props.posts, props.userName]);

  return (
    <React.Fragment>
      <PostHeader setSort={setSort} currentSort={sort}>
        <Search />
        {currentUserName ? <NavCreatePost /> : null}
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
  userName: PropTypes.string.isRequired,
};
