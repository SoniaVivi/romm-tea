import styled from "styled-components";

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  z-index: 3;
  display: none;
  flex-flow: column nowrap;
  width: calc(100% + 2px);
  border: 1px solid ${({ theme }) => theme.navBorder};
  ${(props) =>
    props.topBorder
      ? ""
      : `
  border-top: unset;
  border-top-left-radius: unset;
  border-top-right-radius: unset;`}
  background-color: ${({ theme }) => theme.postColor};
`;

export default DropdownContainer;
