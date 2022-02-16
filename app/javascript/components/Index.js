import React from "react";
import PropTypes from "prop-types";
import store from "./redux/store";
import { Provider } from "react-redux";
import PostIndex from "./posts/PostIndex";
import ThemeWrapper from "./styled/ThemeWrapper";

const Index = (props) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <PostIndex {...props} />
      </ThemeWrapper>
    </Provider>
  );
};

export default Index;

Index.propTypes = {
  posts: PropTypes.array.isRequired,
};
