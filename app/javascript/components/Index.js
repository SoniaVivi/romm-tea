import React from "react";
import PropTypes from "prop-types";
import ThemeWrapper from "./styled/ThemeWrapper";
import PostIndex from "./posts/PostIndex";
import StoreWrapper from "./StoreWrapper";

const Index = (props) => {
  return (
    <StoreWrapper>
      <ThemeWrapper>
        <PostIndex {...props} />
      </ThemeWrapper>
    </StoreWrapper>
  );
};

export default Index;

Index.propTypes = {
  posts: PropTypes.array.isRequired,
};
