import styled from "styled-components";

export const FormActionButton = styled.button`
  height: 34px;
  padding: 5px 10px;
  font-size: 17px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${34 * 0.75}px;
  background-color: ${({ theme }) => theme.background};
`;
