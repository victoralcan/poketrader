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
    height: 100%;
  }

  body {
    background: #2B3B69;
    height: 100vh;
  }

  body, input, button {
    font-family: 'Nunito', sans-serif;
  }

  a {
    color: #000;
  }

  button {
    cursor: pointer;
  }
`;
