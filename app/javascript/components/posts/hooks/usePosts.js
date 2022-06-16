import { useDispatch, useSelector } from "react-redux";
import { getSort, setSort } from "../../redux/optionSlice";
import { useGetPostsQuery } from "../../redux/postSlice";

const usePosts = (options = {}) => {
  const dispatch = useDispatch();
  const sortOption = useSelector(getSort);
  const currentUserName = useSelector((state) => state.user.name);
  const filters = useSelector((state) => state.option.filters);
  const query = {
    sort: sortOption,
    tags: filters?.tags.length ? filters.tags : "",
    title: filters?.title.length ? filters.title : "",
    userName: currentUserName,
  };

  const data = useGetPostsQuery(query, { skip: !sortOption, ...options });
  const setNewSort = (newSort) => dispatch(setSort(newSort));

  return { data: data, setSort: setNewSort, sort: sortOption };
};

export default usePosts;
