import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
    @import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap");

    * {
        padding: 0;
        margin: 0;
        font-family: "Titillium Web", sans-serif;
    }

    body {
    background: #c3c6c432;
    overflow: hidden;
    }
    
`;


export default GlobalStyle;