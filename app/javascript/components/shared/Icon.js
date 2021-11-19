import styled from "styled-components";

export const Icon = styled.img`
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: ${(props) => props.marginRight ?? 0};
  mask-image: url(${(props) => props.link});
  background-color: ${(props) => props.color};
`;
