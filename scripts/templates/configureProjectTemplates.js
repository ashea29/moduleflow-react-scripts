import stripIndent from 'strip-indent';



export const ContainerUtility = stripIndent(`
  import styled from 'styled-components'

  const Container = styled.div\`
    width: 1000px;
    max-width: 100%;
    padding: 0.75rem 1.5rem
    margin: 0 auto;
  \`

  export default Container
`).trim()


export const FlexUtility = stripIndent(`
  import styled from 'styled-components'

  const Flex = styled.div\`

  \`

  export default Flex
`).trim()


export const LoadingSpinnerCSS = stripIndent(`
  .spinner {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .spinner:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #713956;
    border-color: #713956 transparent #713956 transparent;
    animation: spinner 1.2s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`).trim()

export const LoadingSpinnerStyled = stripIndent(`
  import styled from 'styled-components'


  const StyledLoadingSpinner = styled.div\`
    .spinner {
      display: inline-block;
      width: 80px;
      height: 80px;
    }

    .spinner:after {
      content: ' ';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #713956;
      border-color: #713956 transparent #713956 transparent;
      animation: spinner 1.2s linear infinite;
    }

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  \`

  export default StyledLoadingSpinner
`).trim()


export const FullscreenSpinnerCSS = stripIndent(`
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100%;
  }
`).trim()


export const FullscreenSpinnerStyled = stripIndent(`
  import styled from 'styled-components'


  const StyledFullscreenSpinner = styled.div\`
    .spinner-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80vh;
      width: 100%;
    }
  \`

  export default StyledFullscreenSpinner
`).trim()


export const ThemePreset = stripIndent(`
  const theme = {
    colors: {},
    breakpoints: {
      phoneSmall: "300px",
      phoneMedium: "599px",
      tabletPortrait: "600px",
      tabletLandscape: "900px",
      pcSmall: "1200px",
      pcMedium: "1500px",
      pcLarge: "1800px",
      pcXLarge: "2100px"
    }
  }


  export default theme
`).trim()


export const GlobalStylesPreset = stripIndent(`
  import { createGlobalStyle } from "styled-components"


  const GlobalStyles = createGlobalStyle\`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
  \`

  export default GlobalStyles
`).trim()


export const TSDeclarationsFile = stripIndent(`
  import { DefaultTheme } from 'styled-components';
  
  declare module 'styled-components' {
    export interface DefaultTheme {
      breakpoints: {
        [name in 
          'phoneSmall'      | 
          'phoneMedium'     | 
          'tabletPortrait'  | 
          'tabletLandscape' | 
          'pcSmall'         | 
          'pcMedium'        | 
          'pcLarge'         | 
          'pcXLarge'
        ]: number;
      };
    }
  }
`).trim()