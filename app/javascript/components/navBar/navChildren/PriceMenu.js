import React from "react";
import styled from "styled-components";
import { NavOption } from "./NavOption";
import PropTypes from "prop-types";

const Container = styled(NavOption)`
  position: relative;
  flex-flow: column nowrap;
  min-width: 80px;

  * {
    font-size: 16px;
    font-weight: 600;
  }

  *:not(.visible) {
    display: none;
  }

  &:hover * {
    display: flex;
  }
`;

const Wrapper = styled.ul`
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
  background-color: ${(props) => props.theme.postColor};

  li:first-child {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: unset;
  }
`;

const MenuButton = styled.button`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const MenuSpan = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.text};
`;

const PriceMenu = (props) => {
  return (
    <Container>
      <span className="visible" css={"user-select: none;"}>
        Price
      </span>
      <Wrapper>
        <li>
          <MenuButton
            onClick={props.highLowSort}
            className={props.classNameMatcher("high-low")}
          >
            <MenuSpan>High</MenuSpan>
            <Divider />
            <MenuSpan>Low</MenuSpan>
          </MenuButton>
        </li>
        <li>
          <MenuButton
            onClick={props.lowHighSort}
            className={props.classNameMatcher("low-high")}
          >
            <MenuSpan>Low</MenuSpan>
            <Divider />
            <MenuSpan>High</MenuSpan>
          </MenuButton>
        </li>
      </Wrapper>
    </Container>
  );
};

export default PriceMenu;

PriceMenu.propTypes = {
  lowHighSort: PropTypes.func.isRequired,
  highLowSort: PropTypes.func.isRequired,
  classNameMatcher: PropTypes.func.isRequired,
};
