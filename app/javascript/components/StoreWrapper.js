import React from "react";
import PropTypes from "prop-types";
import store from "./redux/store";
import { Provider } from "react-redux";

const StoreWrapper = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreWrapper;

StoreWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
