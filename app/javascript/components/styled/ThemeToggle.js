import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleTheme } from "../users/userSlice";
import moon from "svgs/moon.svg";
import sun from "svgs/sun.svg";
import { Icon } from "../shared/Icon";

const containerHeight = 24;
const iconSize = 12;
const padding = 5;

const Container = styled.li`
  align-self: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  height: ${containerHeight}px;
  margin-top: 3px;
  margin-right: 10px;
  padding: 0 ${padding}px;
  border: 1px solid ${(props) => props.theme.navBorder};
  border-radius: ${containerHeight * 0.75}px;
  background-color: ${(props) => props.theme.background};
  cursor: pointer;
`;

const Circle = styled.div`
  position: absolute;
  z-index: 3;
  left: ${(props) =>
    props.themeName == "light"
      ? "5px"
      : `calc(100% - ${padding + iconSize}px)`};
  min-width: ${iconSize}px;
  min-height: ${iconSize}px;
  background-color: ${(props) => props.theme.postColor};
  border: 1px solid ${(props) => props.theme.navBorder};
  transition: left 200ms ease-out;
`;

const ThemeToggle = () => {
  const theme = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  // "Uncaught SyntaxError: missing ] after element list" occurs when toggling theme
  // Adding a try-catch statement removes this error, however it significantly
  // Increases latency on click
  return (
    <Container onClick={() => setTimeout(dispatch(toggleTheme()), 200)}>
      <Icon link={moon} size={iconSize} />
      <Circle themeName={theme} />
      <Icon link={sun} size={iconSize} />
    </Container>
  );
};

export default ThemeToggle;
