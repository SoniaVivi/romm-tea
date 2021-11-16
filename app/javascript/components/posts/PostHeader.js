import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const childPadding = "10px";

const HeaderContainer = styled.ul`
  display: flex;
  width: calc(100% - ${({ theme }) => theme.postSideMargin * 4 - 1}px);
  height: 48px;
  margin-left: 5px;
  ${({ theme }) => theme.postMarginBottom}
  border: 1px solid #cccccc;

  * {
    font-size: 16px;
    font-weight: 600;
  }
`;

const SortOption = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 0;
`;

const SortButton = styled.button`
  height: 100%;
  padding: 0 ${childPadding};

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const PriceMenu = styled(SortOption)`
  position: relative;
  flex-flow: column nowrap;
  min-width: 80px;

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

const PostHeader = (props) => {
  const isSelected = (match) =>
    match == props.currentSort ? "selected" : null;

  return (
    <HeaderContainer className="background-post">
      <SortOption>
        <SortButton
          onClick={() => props.setSort("new")}
          className={isSelected("new")}
        >
          New
        </SortButton>
      </SortOption>
      <SortOption>
        <SortButton
          onClick={() => props.setSort("top")}
          className={isSelected("top")}
        >
          Top
        </SortButton>
      </SortOption>
      <PriceMenu>
        <span className="visible">Price</span>
        <ul className="background-post">
          <li>
            <button
              onClick={() => props.setSort("high-low")}
              className={isSelected("high-low")}
            >
              <span>High</span>
              <Divider />
              <span>Low</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => props.setSort("low-high")}
              className={isSelected("low-high")}
            >
              <span>Low</span>
              <Divider />
              <span>High</span>
            </button>
          </li>
        </ul>
      </PriceMenu>
      {props.children}
    </HeaderContainer>
  );
};

export default PostHeader;

PostHeader.propTypes = {
  setSort: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  children: PropTypes.object,
};
