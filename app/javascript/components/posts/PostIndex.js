import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addPosts } from "../posts/postSlice";
import Post from "./Post";

const PostIndex = (props) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(addPosts(props.posts)), []);

  return (
    <React.Fragment>
      {props.posts.map(({ id }) => (
        <Post key={id} id={id} />
      ))}
    </React.Fragment>
  );
};

export default PostIndex;

PostIndex.propTypes = {
  posts: PropTypes.array.isRequired,
};
