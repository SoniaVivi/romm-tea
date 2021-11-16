import React from "react";
import PropTypes from "prop-types";
import store from "./redux/store";
import { Provider } from "react-redux";
import PostIndex from "./posts/PostIndex";
import { ThemeProvider } from "styled-components";

const theme = {
  text: "#000000",
  background: "#f5f5f5",
  postColor: "#ffffff",
  borderColor: "#edeff1",
  postSideMargin: "5",
  postSidePadding: "10",
  postMarginBottom: "margin-bottom: 15px;",
  hover: "rgba(85, 205, 252, 0.4)",
};

const Index = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PostIndex posts={props.posts} />
      </ThemeProvider>
    </Provider>
  );
};

export default Index;

Index.propTypes = {
  posts: PropTypes.array.isRequired,
};
