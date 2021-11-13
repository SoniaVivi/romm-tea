import React from "react";
import PropTypes from "prop-types";

const TrimmedLink = (props) => {
  const maxLength = props.maxLength ?? 24;
  const trimString = (str) => {
    const removeScheme = () => str.replace(/(https:\/\/)|(http:\/\/)/, "");
    if (!str) {
      return "";
    } else if (str.length <= maxLength) {
      return removeScheme();
    }
    return `${removeScheme().slice(0, maxLength - 3)}...`;
  };

  return (
    <div className="hint-container">
      <a href={props.href}>{trimString(props.href)}</a>
      {props.href && props.href.length > maxLength ? (
        <span className="hint">{props.href}</span>
      ) : null}
    </div>
  );
};

export default TrimmedLink;

TrimmedLink.propTypes = {
  href: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};
