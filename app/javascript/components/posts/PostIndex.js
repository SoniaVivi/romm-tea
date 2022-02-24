import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import PostHeader from "../navBar/PostHeader";
import usePostIds from "./hooks/usePostIds";
import usePostsFromProps from "./hooks/usePostsFromProps";

const PostIndex = (props) => {
  usePostsFromProps({
    posts: props.posts,
    userName: props.userName,
  });
  const { postIds } = usePostIds();

  return (
    <React.Fragment>
      <PostHeader></PostHeader>
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
