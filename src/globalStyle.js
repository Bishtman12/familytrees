import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   
    * {
        padding: 0;
        margin: 0;
        font-family: "Titillium Web", sans-serif;
    }

    :root {
        --mainColor: #29335c;
        --mainColorLight: #5767aa;
        --secondaryColor: #db2b39;
        --textColor: #eee;
    }

    body {
        background: #c3c6c432;
        overflow: hidden;
      }
`;


export default GlobalStyle;