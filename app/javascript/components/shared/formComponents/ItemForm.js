import React, { useState } from "react";
import PropTypes from "prop-types";
import NumberForm from "./NumberForm";
import styled from "styled-components";
import { NumberFormWrapper } from "./NumberFormWrapper";
import { TextForm } from "./TextForm";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  > * {
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.childType == "number" ? "row" : "column"};

  > * {
    margin-right: 10px;
  }
  ${(props) =>
    props.childType == "text"
      ? "> *:not(:last-child) {margin-bottom: 15px;}"
      : ""}
`;

const RemoveButton = styled(NumberFormWrapper)`
  justify-content: center;
  align-items: center;
  width: 61px;
  font-size: 16px;
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0;

  button:first-child {
    margin-left: 30%;
  }

  button:last-child {
    margin-right: 30%;
  }
`;

const BottomButtons = styled.button`
  height: 32px;
  margin-bottom: 0;
  padding: 5px 15px;
  border: 1px solid ${({ theme }) => theme.postColor};
  border-radius: 24px;
  background-color: ${({ theme }) => theme.background};
`;

const ItemForm = (props) => {
  const [mode, setMode] = useState(["edit", "remove"]);

  return (
    <Container>
      <h3>
        {mode[0] == "edit" ? props.editHeaderText : props.removeHeaderText}
      </h3>
      <Wrapper childType={props.childType}>
        {props.items.map((value, i) => {
          if (mode[0] == "edit") {
            return props.childType == "number" ? (
              <NumberForm
                value={props.items[i]}
                fieldName="newItemValue"
                onChange={(callback) =>
                  props.modifyItems((prevItems) => {
                    const newItemValue = callback({
                      newItemValue: prevItems[i],
                    })["newItemValue"];
                    let newItems = [...prevItems];
                    newItems[i] = newItemValue;
                    return [...newItems];
                  })
                }
              />
            ) : (
              <TextForm
                value={props.items[i]}
                onChange={(e) =>
                  props.modifyItems((prevItems) => {
                    let newItems = [...prevItems];
                    newItems[i] = e.target.value;
                    return [...newItems];
                  })
                }
              />
            );
          }
          return (
            <RemoveButton
              key={i}
              as="button"
              size={35}
              onClick={() =>
                props.modifyItems((prevItems) => {
                  let newItems = [...prevItems];
                  newItems.splice(i, 1);
                  return [...newItems];
                })
              }
            >
              {value}
            </RemoveButton>
          );
        })}
      </Wrapper>
      <BottomButtonContainer>
        <BottomButtons
          className="hover"
          onClick={() => setMode((prevMode) => [...prevMode].reverse())}
        >
          {mode[1].slice(0, 1).toUpperCase() + mode[1].slice(1)}
        </BottomButtons>
        <BottomButtons
          className="hover"
          onClick={() =>
            props.modifyItems((items) => [...items, props.newItemValue])
          }
        >
          Add
        </BottomButtons>
      </BottomButtonContainer>
    </Container>
  );
};

export default ItemForm;

ItemForm.propTypes = {
  items: PropTypes.array.isRequired,
  modifyItems: PropTypes.func.isRequired,
  newItemValue: PropTypes.any.isRequired,
  editHeaderText: PropTypes.string.isRequired,
  removeHeaderText: PropTypes.string.isRequired,
  childType: PropTypes.string.isRequired,
};
