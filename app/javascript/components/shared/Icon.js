import styled from "styled-components";

export const Icon = styled.img`
  display: inline-block;
  width: ${(props) => props.size ?? 13}px;
  height: ${(props) => props.size ?? 13}px;
  margin-right: ${(props) => props.marginRight ?? 0};
  mask-image: url(${(props) => props.link});
  background-color: ${(props) => props.color ?? props.theme.text};
`;
