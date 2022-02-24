import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  color: ${(props) => props.theme.text};
}

  body {
    background-color: ${(props) => props.theme.background};
  }

  a {
    color: ${(props) => props.theme.linkColor};
  }

  input,
  textarea {
    background-color: ${(props) => props.theme.background};
  }

  .container {
    min-width: ${(props) => props.theme.minWidth}px;
  }

  .background-post {
    background-color: ${(props) => props.theme.postColor};
  }

  .exit {
    border: 1px solid ${(props) => props.theme.postColor};

    &:hover {
      background-color: ${(props) => props.theme.background};
    }

    * {
      background-color: ${(props) => props.theme.text};
    }
  }

  .modal {
    background-color: ${(props) => props.theme.modalBackdropColor};
  }

  .modal-wrapper {
    background-color: ${(props) => props.theme.postColor};
  }

  .hover:hover {
    background-color: ${(props) => props.theme.hover};
  }

  .divider {
    background-color: ${(props) => props.theme.text};
  }

  .hint {
    background-color: ${(props) => props.theme.hintBackground};
    color: ${(props) => props.theme.invertedText};

    &::after {
      border-bottom: 5px solid ${(props) => props.theme.hintBackground};
    }
  }

  .selected {
    background: radial-gradient(
      ${(props) => props.theme.navSelected},
      ${(props) => props.theme.navSelected} 60%,
      ${(props) => props.theme.postColor} 60%
    );
  }

.hover-outline {
  border: 1px solid ${({ theme }) => theme.postColor};


  &:hover {
    border: 1px solid ${({ theme }) => theme.navBorder};
  }
}

`;

export default GlobalStyle;
