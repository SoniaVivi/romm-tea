import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../../posts/postSlice";
import { setUserName } from "../../users/userSlice";

const usePostsFromProps = ({ posts = [], userName = "" }) => {
  const dispatch = useDispatch();
  const currentUserName = useSelector((state) => state.user.name);
  useEffect(() => {
    dispatch(addPosts(posts));
    dispatch(setUserName(userName));
  }, [dispatch, posts, userName]);

  return { userName: currentUserName };
};

export default usePostsFromProps;
