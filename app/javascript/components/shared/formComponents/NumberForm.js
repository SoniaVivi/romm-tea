import React from "react";
import PropTypes from "prop-types";
import Arrow from "svgs/arrow.svg";
import { Icon } from "../Icon";
import styled from "styled-components";
import { arrowSize, NumberFormWrapper } from "./NumberFormWrapper";

const ArrowContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  img {
    width: ${arrowSize}px;
    height: ${arrowSize}px;
  }

  img:first-child {
    transform: rotate(180deg);
  }
`;

const NumberForm = (props) => {
  const setValue = (val) =>
    /^\d+$/.test(val) || val == ""
      ? props.onChange((prev) => ({ ...prev, [props.fieldName]: Number(val) }))
      : null;
  const valueStepFunc =
    (change = 1) =>
    () =>
      props.onChange((prev) => ({
        ...prev,
        [props.fieldName]: prev[props.fieldName] + change,
      }));

  return (
    <NumberFormWrapper>
      <input
        value={props.value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <div className="divider vertical"></div>
      <ArrowContainer>
        <Icon onClick={valueStepFunc()} link={Arrow} />
        <div className="divider"></div>
        <Icon onClick={valueStepFunc(-1)} link={Arrow} />
      </ArrowContainer>
    </NumberFormWrapper>
  );
};

export default NumberForm;

NumberForm.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};
