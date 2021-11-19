import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import person from "svgs/person.svg";
import { Icon } from "../shared/Icon";
import { NavOption } from "../shared/NavOption";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import Login from "./Login";
import Signup from "./Signup";
import { setUserName } from "./userSlice";

const personIconSize = 25;

const PersonIconContainer = styled(NavOption)`
  align-self: center;
  min-width: 110px;
  height: ${personIconSize + 10}px;
  margin-right: 20px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.postColor};

  &:hover {
    border-color: ${({ theme }) => theme.borderColor};
  }
`;

const PersonIcon = styled(Icon)`
  width: ${personIconSize}px;
  height: ${personIconSize}px;
`;

const Wrapper = styled.div`
  align-items: center;
  min-height: 360px;

  > *:not(.exit) {
    margin-bottom: 15px;
  }
`;

const LoggedInUserContainer = styled(PersonIconContainer)`
  position: relative;
  border-bottom: unset;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;

  &:hover > div {
    display: flex;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 3;
  display: none;
  top: 100%;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-top: unset;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  background-color: ${({ theme }) => theme.postColor};
`;

const DropdownButton = styled.button`
  display: flex;
  width: 100%;
  padding-left: 36px;
  padding-bottom: 10px;
  font-size: 16px;
`;

const HeaderUserForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("login");
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const toggleModal = () => setShowModal((prev) => !prev);
  const togglePage = () =>
    setPage((prev) => (prev == "login" ? "signup" : "login"));

  if (userName.length) {
    return (
      <LoggedInUserContainer onClick={toggleModal}>
        <PersonIcon link={person} color="#000000" />
        <span>{userName}</span>
        <Dropdown>
          <DropdownButton
            className="hover"
            onClick={() =>
              sendAjaxRequest("DELETE", "/users/sign_out", "")
                .then(() => dispatch(setUserName()))
                .catch((error) => console.log(error))
            }
          >
            Log out
          </DropdownButton>
        </Dropdown>
      </LoggedInUserContainer>
    );
  }

  return (
    <React.Fragment>
      <PersonIconContainer onClick={toggleModal}>
        <PersonIcon link={person} color="#000000" />
      </PersonIconContainer>
      {showModal ? (
        <div className="modal">
          <Wrapper className="modal-wrapper">
            <div onClick={toggleModal} className="exit">
              <div></div>
              <div></div>
            </div>
            {page == "login" ? (
              <Login toggleModal={toggleModal} togglePage={togglePage} />
            ) : (
              <Signup toggleModal={toggleModal} togglePage={togglePage} />
            )}
          </Wrapper>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default HeaderUserForm;
