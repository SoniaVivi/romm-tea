import React from "react";
import ThemeWrapper from "./styled/ThemeWrapper";
import Profile from "./users/Profile";
import StoreWrapper from "./StoreWrapper";

const UserShow = (props) => {
  return (
    <StoreWrapper>
      <ThemeWrapper>
        <Profile {...props} />
      </ThemeWrapper>
    </StoreWrapper>
  );
};

export default UserShow;
