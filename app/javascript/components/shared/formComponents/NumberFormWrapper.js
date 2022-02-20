import styled from "styled-components";

export const inputSize = 50;

export const arrowSize = 25;

export const NumberFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.size ?? inputSize + arrowSize + 1}px;
  max-height: 50px;
  height: 50px;
  background-color: ${(props) => props.background ?? props.theme.background};

  > *:not(.divider) {
    border: unset;
    background-color: unset;
  }

  input {
    width: ${inputSize}px;
  }
`;
