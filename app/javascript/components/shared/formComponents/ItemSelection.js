import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DropdownButton from "../dropdown/DropdownButton";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  width: 25px;
  min-height: 50px;
  margin-top: 21px;
  margin-left: -16px;
  background-color: ${(props) => props.theme.background};
`;

const Option = styled(DropdownButton)`
  justify-content: center;
  margin: 0;
  padding: 2px;
  font-weight: 600;

  &.selected {
    background-color: ${(props) => props.theme.navSelected};
  }
`;

const ItemSelection = (props) => {
  return (
    <Container>
      <div className="divider vertical"></div>
      {props.items.map((itemText, i) => (
        <React.Fragment key={i}>
          {i % 2 ? (
            <div className="divider" css={"width: calc(100% - 1px);"}></div>
          ) : null}
          <Option
            onClick={() => props.onClick(itemText)}
            className={`hover${itemText == props.value ? " selected" : ""}`}
          >
            {props.displayFunc ? props.displayFunc(itemText) : itemText}
          </Option>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ItemSelection;

ItemSelection.propTypes = {
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  displayFunc: PropTypes.func,
};
