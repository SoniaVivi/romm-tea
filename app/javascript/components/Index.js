import React from "react";
import PropTypes from "prop-types";
import ThemeWrapper from "./styled/ThemeWrapper";
import PostIndex from "./posts/PostIndex";
import StoreWrapper from "./StoreWrapper";

const Index = (props) => {
  return (
    <StoreWrapper>
      <ThemeWrapper>
        <PostIndex userName={props.userName || ""} />
      </ThemeWrapper>
    </StoreWrapper>
  );
};

export default Index;

Index.propTypes = {
  userName: PropTypes.string,
};
