import styled from "styled-components";

const Tag = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 26px;
  margin: 0 2px;
  margin-bottom: 5px;
  padding: 0 4px;
  padding-bottom: 2px;
  border: 1px solid ${(props) => props.theme.postColor};
  background-color: ${(props) => props.theme.tagColor};
  color: ${(props) => props.theme.tagTextColor};
`;

export default Tag;
