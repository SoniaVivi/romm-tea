import React from "react";
import styled from "styled-components";
import HeaderUserForm from "../users/HeaderUserForm";
import { NavOption } from "./NavOption";
import ThemeToggle from "../styled/ThemeToggle";
import usePostIds from "../posts/hooks/usePostIds";
import NavCreatePost from "./NavCreatePost";
import Search from "./Search";
import Timer from "./Timer";

const childPadding = "10px";

const NavBarHeader = styled.ul`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  max-width: calc(100% - ${({ theme }) => theme.postSideMargin * 4 - 1}px);
  width: 960px;
  height: 48px;
  margin-left: 5px;
  padding-left: ${childPadding};
  ${({ theme }) => theme.postMarginBottom}
  border: 1px solid ${(props) => props.theme.navBorder};
  font-size: 16px;
  background-color: ${(props) => props.theme.postColor};

  * {
    font-weight: 600;
    color: ${(props) => props.theme.text};
  }
`;

const SortButton = styled.button`
  height: 100%;
  padding: 0 ${childPadding};
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const PriceMenu = styled(NavOption)`
  position: relative;
  flex-flow: column nowrap;
  min-width: 80px;

  * {
    font-size: 16px;
  }

  *:not(.visible) {
    display: none;
  }

  &:hover * {
    display: flex;
  }

  ul {
    position: absolute;
    top: 100%;
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% + 2px);
    height: fit-content;
    padding-bottom: 5px;
    z-index: 3;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-top: unset;
    border-top-left-radius: unset;
    border-top-right-radius: unset;

    button {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 100%;

      &:hover {
        background-color: ${({ theme }) => theme.hover};
      }
    }

    li:first-child {
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: 1px solid ${({ theme }) => theme.borderColor};
      border-radius: unset;
    }

    span {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.text};
`;

const PostHeader = () => {
  const { sort: currentSort, setSort } = usePostIds();
  const isSelected = (match) => (match == currentSort ? "selected" : null);

  const setPostsSort = (sort) => () => {
    setSort(sort);
    window.scrollTo(0, 0);
  };

  return (
    <NavBarHeader>
      <NavOption as={"a"} onClick={() => (location.href = "/")}>
        Home
      </NavOption>
      <NavOption>
        <SortButton onClick={setPostsSort("new")} className={isSelected("new")}>
          New
        </SortButton>
      </NavOption>
      <NavOption>
        <SortButton onClick={setPostsSort("top")} className={isSelected("top")}>
          Top
        </SortButton>
      </NavOption>
      <PriceMenu>
        <span className="visible">Price</span>
        <ul className="background-post">
          <li>
            <button
              onClick={setPostsSort("high-low")}
              className={isSelected("high-low")}
            >
              <span>High</span>
              <Divider />
              <span>Low</span>
            </button>
          </li>
          <li>
            <button
              onClick={setPostsSort("low-high")}
              className={isSelected("low-high")}
            >
              <span>Low</span>
              <Divider />
              <span>High</span>
            </button>
          </li>
        </ul>
      </PriceMenu>
      <Timer />
      <Search />
      <NavCreatePost />
      <HeaderUserForm />
      <ThemeToggle />
    </NavBarHeader>
  );
};

export default PostHeader;
