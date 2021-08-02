import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    margin: 0 auto;
  }

  body {
    background: #9FB9BC;
  }

  body, input, button {
    font: 18px Verdana, sans-serif;
  }

  a {
    color: #000
  }

  button {
    cursor: pointer;
  }
`;
