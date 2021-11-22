import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DropdownButton from "../shared/dropdown/DropdownButton";
import DropdownContainer from "../shared/dropdown/DropdownContainer";
import PostForm from "./PostForm";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import { addPosts } from "./postSlice";

const ContainerSize = 25;

const Container = styled.div`
  position: absolute;
  top: 5;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${ContainerSize}px;
    height: ${ContainerSize}px;
    padding: 0 5px;
    border: 1px solid ${({ theme }) => theme.postColor};
    border-radius: 50%;

    div {
      width: 3px;
      height: 3px;
      background-color: #c0c0c0;
    }
  }

  .visible {
    display: flex;
  }
`;

const Menu = styled(DropdownContainer)`
  right: 0;
  align-items: center;
  width: 90px;
  min-height: 20px;
`;

const MenuButton = styled(DropdownButton)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 5px;
  padding-left: 0;
`;

const OptionsContainer = (props) => {
  const [mode, setMode] = useState("");
  const postData = useSelector((state) => state.post.posts[props.postId]);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const editPost = (data) =>
    sendAjaxRequest("GET", `/posts/${postData.id}/edit`, data).then(
      (response) => {
        if (response.success) {
          dispatch(addPosts(response.post));
          setMode("");
        }
      }
    );

  return (
    <Container>
      <button
        className="hover"
        onClick={() =>
          setMode((prevMode) => (prevMode != "menu" ? "menu" : ""))
        }
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      {mode == "menu" ? (
        <Menu className="visible" topBorder={true}>
          {userName == postData.poster ? (
            <MenuButton className="hover" onClick={() => setMode("edit")}>
              Edit Post
            </MenuButton>
          ) : null}
        </Menu>
      ) : null}
      {mode == "edit" ? (
        <PostForm
          toggle={() => setMode("")}
          initialState={{ ...postData, price: Number(postData.price) }}
          submitFunc={editPost}
        />
      ) : null}
    </Container>
  );
};

export default OptionsContainer;

OptionsContainer.propTypes = { postId: PropTypes.number.isRequired };
