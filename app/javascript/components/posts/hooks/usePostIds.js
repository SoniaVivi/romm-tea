import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSort, setSort } from "../postSlice";

const usePostIds = (useFilters = true) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.post.filters);
  const posts = useSelector((state) => state.post.posts);
  const currentSort = useSelector(getSort);
  const setSortFunc = (newSort) => dispatch(setSort(newSort));

  const postIds = useMemo(() => {
    const postData = Object.values(posts).filter((post) => post?.id);
    if (!postData.length) return [];
    const sortPosts = (sortFunc) =>
      [
        ...postData
          .filter((post) => {
            if (!useFilters) return true;

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

    if (currentSort) {
      switch (currentSort) {
        case "new":
          return sortPosts((a, b) => b.id - a.id);
        case "top":
          return sortPosts((a, b) => b.rating - a.rating);
        case "high-low":
          return sortPosts((a, b) => b.price - a.price);
        case "low-high":
          return sortPosts((a, b) => a.price - b.price);
      }
    }
  }, [currentSort, filters.tags, filters.title, posts, useFilters]);
  return { sort: currentSort, setSort: setSortFunc, postIds };
};

export default usePostIds;
