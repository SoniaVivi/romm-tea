import React from "react";
import styled from "styled-components";
import HeaderUserForm from "../users/HeaderUserForm";
import { NavOption } from "./navChildren/NavOption";
import ThemeToggle from "../styled/ThemeToggle";
import NavCreatePost from "./navChildren/NavCreatePost";
import Search from "./navChildren/Search";
import Timer from "./Timer";
import PriceMenu from "./navChildren/PriceMenu";
import usePosts from "../posts/hooks/usePosts";

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
    color: ${(props) => props.theme.text};
  }
`;

const SortButton = styled.button`
  height: 100%;
  padding: 0 ${childPadding};
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const Header = () => {
  const { sort: currentSort, setSort } = usePosts({ skip: true });
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
      <PriceMenu
        lowHighSort={setPostsSort("low-high")}
        highLowSort={setPostsSort("high-low")}
        classNameMatcher={isSelected}
      />
      <Timer />
      <Search />
      <NavCreatePost />
      <HeaderUserForm />
      <ThemeToggle />
    </NavBarHeader>
  );
};

export default Header;
