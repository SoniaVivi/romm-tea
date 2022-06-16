import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NavOption } from "./NavOption";
import PostForm from "../../posts/PostForm";
import { useCreatePostMutation } from "../../redux/postSlice";

const HeaderContainer = styled(NavOption)`
  align-self: center;
  min-width: fit-content;
  height: 35px;
  margin: 0 10px 0 15px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
`;

const NavCreatePost = () => {
  const isLoggedIn = useSelector((state) => !!state.user.name.length);
  const [showModal, toggleModal] = useReducer((state) => !state, false);
  const [createPost, createPostResult] = useCreatePostMutation();
  const submitPost = (data) => createPost(data);

  useEffect(() => {
    !createPostResult.isUnitialized ? console.log(createPostResult) : null;
    if (createPostResult.isSuccess) toggleModal();
  }, [createPostResult]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <HeaderContainer className="hover-outline">
      <StyledButton onClick={toggleModal}>New post</StyledButton>
      {showModal ? (
        <PostForm toggle={toggleModal} submitFunc={submitPost} />
      ) : null}
    </HeaderContainer>
  );
};

export default NavCreatePost;
