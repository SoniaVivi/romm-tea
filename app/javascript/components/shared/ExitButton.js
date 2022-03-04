import React from "react";
import PropTypes from "prop-types";

const ExitButton = (props) => {
  return (
    <div onClick={props.toggle} className="exit" css={props.cssText ?? ""}>
      <div></div>
      <div></div>
    </div>
  );
};

export default ExitButton;

ExitButton.propTypes = {
  toggle: PropTypes.func.isRequired,
  cssText: PropTypes.string,
};
