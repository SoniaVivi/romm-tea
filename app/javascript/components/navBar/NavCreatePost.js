import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavOption } from "./NavOption";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import PostForm from "../posts/PostForm";
import { addPosts } from "../posts/postSlice";

const HeaderContainer = styled(NavOption)`
  align-self: center;
  min-width: fit-content;
  height: 35px;
  margin: 0 10px 0 15px;
  font-size: 14px;

  > button {
    width: 100%;
    height: 100%;
    padding: 0 20px;
  }
`;

const NavCreatePost = () => {
  const isLoggedIn = useSelector((state) => !!state.user.name.length);
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
  if (!isLoggedIn) {
    return null;
  }

  return (
    <HeaderContainer className="hover-outline">
      <button onClick={toggleModal}>New post</button>
      {showModal ? (
        <PostForm toggle={toggleModal} submitFunc={submitPost} />
      ) : null}
    </HeaderContainer>
  );
};

export default NavCreatePost;
