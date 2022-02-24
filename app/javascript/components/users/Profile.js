import React from "react";
import PropTypes from "prop-types";
import Post from "../posts/Post";
import usePostIds from "../posts/hooks/usePostIds";
import usePostsFromProps from "../posts/hooks/usePostsFromProps";
import PostHeader from "../navBar/PostHeader";

const Profile = (props) => {
  usePostsFromProps({
    posts: props.posts,
    userName: props.currentUserName,
  });

  const { postIds, setSort, sort } = usePostIds(false);

  return (
    <React.Fragment>
      <PostHeader setSort={setSort} currentSort={sort} />
      {postIds.map((postId) => (
        <Post key={postId} id={postId} />
      ))}
    </React.Fragment>
  );
};

export default Profile;

Profile.propTypes = {
  posts: PropTypes.array.isRequired,
  currentUserName: PropTypes.string.isRequired,
};
