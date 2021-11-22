import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { NavOption } from "../shared/NavOption";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import PostForm from "./PostForm";
import { addPosts } from "./postSlice";

const HeaderContainer = styled(NavOption)`
  align-self: center;
  min-width: fit-content;
  height: 35px;
  margin: 0 auto 0 16px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.postColor};

  &:hover {
    border: 1px solid ${({ theme }) => theme.borderColor};
  }

  > button {
    width: 100%;
    height: 100%;
    padding: 0 20px;
  }
`;

const NavCreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);
  const dispatch = useDispatch();
  const submitPost = (data) =>
    sendAjaxRequest("POST", "/posts", data).then((response) => {
      if (response.success) {
        dispatch(addPosts(response.post));
        toggleModal();
      }
    });

  return (
    <HeaderContainer>
      <button onClick={toggleModal}>New post</button>
      {showModal ? (
        <PostForm toggle={toggleModal} submitFunc={submitPost} />
      ) : null}
    </HeaderContainer>
  );
};

export default NavCreatePost;
