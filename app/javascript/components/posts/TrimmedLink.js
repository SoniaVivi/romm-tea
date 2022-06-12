import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const HintDialog = styled.span`
  min-width: 150px;
  width: fit-content;
  word-break: break-all;
`;

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
      <a href={props.href} target="_blank" rel="noreferrer">
        {trimString(props.href)}
      </a>
      {props.href && props.href.length > maxLength ? (
        <HintDialog className="hint">{props.href}</HintDialog>
      ) : null}
    </div>
  );
};

export default TrimmedLink;

TrimmedLink.propTypes = {
  href: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};
