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
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(234,249,249,0.67) 0.1%, rgba(239,249,251,0.63) 90.1% );
    overflow: hidden;
    }

`;


export default GlobalStyle;