import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";

const defaultStyles = {
  postSideMargin: "5",
  postSidePadding: "10",
  postMarginBottom: "margin-bottom: 15px;",
  minWidth: "492",
};

const lightTheme = {
  text: "#000000",
  invertedText: "#ffffff",
  background: "#f5f5f5",
  postColor: "#ffffff",
  borderColor: "#edeff1",
  hover: "rgba(85, 205, 252, 0.4)",
  linkColor: "#0079d3",
  hintBackground: "rgba(0, 0, 0, 0.8)",
  navSelected: "rgba(85, 205, 252, 0.226)",
  tagColor: "#e4ffe1",
  modalBackdropColor: "rgba(0, 0, 0, 0.5)",
  navBorder: "#cccccc",
  tagTextColor: "#000000",
};

const darkTheme = {
  text: "#f2f2f2",
  invertedText: "#0c0c0c",
  background: "#000000",
  postColor: "#0a090c",
  borderColor: "#0c0c0c",
  hover: "rgba(85, 205, 252, 0.4)",
  linkColor: "#0079d3",
  hintBackground: "rgba(255, 255, 255, 0.8)",
  navSelected: "rgba(85, 205, 252, 0.226)",
  tagColor: "#497244",
  modalBackdropColor: "rgba(0, 0, 0, 0.5)",
  navBorder: "#282828",
  tagTextColor: "#f2f2f2",
};

const ThemeWrapper = (props) => {
  const theme = useSelector((state) => state.user.theme);

  return (
    <ThemeProvider
      theme={{
        ...defaultStyles,
        ...(theme == "light" ? lightTheme : darkTheme),
      }}
    >
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
