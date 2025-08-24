import { createGlobalStyle } from 'styled-components';
import '../styles/reset.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${(p) => p.theme.background};
    color: ${(p) => p.theme.text};
    font-family: system-ui, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
