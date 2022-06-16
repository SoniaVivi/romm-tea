import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Post from "./Post";
import Header from "../navBar/Header";
import usePosts from "./hooks/usePosts";
import { setUserName } from "../users/userSlice";

const PostIndex = (props) => {
  const dispatch = useDispatch();
  const {
    data: { postIds },
  } = usePosts({
    selectFromResult: ({ data }) => ({ postIds: data?.ids }),
  });

  useEffect(
    () => dispatch(setUserName(props.userName)),
    [props.userName, dispatch]
  );

  if (!postIds) {
    return <Header />;
  }

  return (
    <React.Fragment>
      <Header />
      {postIds.map((id) => (
        <Post key={id} id={id} />
      ))}
    </React.Fragment>
  );
};

export default PostIndex;

PostIndex.propTypes = {
  userName: PropTypes.string,
};
