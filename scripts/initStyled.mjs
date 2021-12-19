import path from 'path';
import paths from 'moduleflow-react-scripts/config/paths.js';
import { exec } from 'child_process';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises';
import { stat, existsSync } from 'fs';
import { argv, exit } from 'process';
import chalk from 'react-dev-utils/chalk.js';
import stripIndent from 'strip-indent'; 
import commander from 'commander';
import { createRequire } from 'module'


const require = createRequire(import.meta.url)
const { Command } = commander
const { appPath } = paths
const { cyan, red, bgRed, green } = chalk
const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')
const yarn = fs.existsSync(path.join(appPath, 'yarn.lock'))

const program = new Command()
const args = argv.slice(2)


program
  .option('-s, --styled', 'Use styled-components')
  .option('-c, --css', 'Use CSS')
  .option('-t, --theme', 'Add theme and global style presets')
  .option('-u, --utilities', 'Add utility styled components presets (i.e. - Container, Flex')
  .option('-a, --auth', 'Add Redux boilerplate for authentication')

program.parse(argv)
const options = program.opts()
console.log(options)

const stylesPreference = {
    type: "checkbox",
    name: "Styles Preference",
    message: "What do you want to use for styling?",
    choices: [
      { 
        name: "CSS" 
      }, 
      { 
        name: "styled-components" 
      }
    ],
    validate(answer) {
      if (answer.length < 1) {
        return 'You must select an option'
      }
      return true
    }
}

const themeAndGlobalStylesPreference = {
    type: "confirm",
    name: "Theme/Global Presets Preference",
    message: "Do you want to add minimal presets for theme and global styles?",
    default: true
}

const utilitiesPreference = {
    type: "confirm",
    name: "Utilities Preference",
    message: "Do you want to add utility styled components presets (i.e. - Container, Flex)?",
    default: true
}

const reduxAuthPreference = {
    type: "confirm",
    name: "Redux Auth Preference",
    message: "Do you want to add minimal Redux boilerplate for authentication?",
    default: true
}


//ANSWERS STRUCTURE:
/*
{
  'Styles Preference': [ 'styled-components' ],
  'Theme/Global Presets Preference': false,
  'Redux Auth Preference': false
}
*/

// const packageJson = require(path.resolve(appRoot, 'package.json'))

// console.log(packageJson.projectPreferences.styles)

// const newPackageJson = JSON.stringify(packageJson, null, '\t')
// writeFile(path.resolve(appRoot, 'package.json'), newPackageJson, {})
// console.log(packageJson)


const installStyledComponents = () => {
  console.log(cyan('Installing styled-components package...'))
  exec(
    `${yarn ? 
        `yarn --cwd ${JSON.stringify(appPath)} add` 
        : 'npm install --prefix'} ${JSON.stringify(appPath)} 
      styled-components styled-breakpoints
      ${options.typescript ? 
        '@types/styled-components' 
        : null
    }`, 
    (error, stdout, stderr) => {
      if (error) {
        console.log(`${bgRed(error)}`)
        return
      }
      if (stderr) {
        console.log(`${bgRed(stderr)}`)
        return
      }
      console.log(
        `${green('styled-components, styled-breakpoints')} 
         ${options.typescript ? 
          ' and ' + green('@types/styled-components') 
          : null
         } 
         successfully installed!`
      )
    }
  )
}

let questionsArray = []
let cliQuestions


(cliQuestions = () => {
  if (!options.styled && !options.css) questionsArray.push(stylesPreference)
  if (options.styled && !options.theme) questionsArray.push(themeAndGlobalStylesPreference)
  if (options.styled && !options.utilities) questionsArray.push(utilitiesPreference)
  if (!options.auth) questionsArray.push(reduxAuthPreference)
})()


//Might have to utilize the 'when' argument in the question object definitions in order to make this logic work properly

if (
    (!options.styled   || 
    !options.css       ||
    !options.theme     ||
    !options.utilities ||
    !options.auth )    &&
    questionsArray.length
  ) {
  inquirer.prompt(
    questionsArray
  ).then((answers) => {
    console.log(answers)
    // selectedModuleType = answers['Module Type'][0]
    // installStyledComponents()
  }).catch((error) => {
    console.log(error)
    exit()
  })
}




const ContainerUtility = stripIndent(`
  import styled from 'styled-components'

  const Container = styled.div\`
    width: 1000px;
    max-width: 100%;
    padding: 0.75rem 1.5rem
    margin: 0 auto;
  \`

  export default Container
`).trim()


const FlexUtility = stripIndent(`
  import styled from 'styled-components'

  const Flex = styled.div\`

  \`

  export default Flex
`).trim()


const ThemePreset = stripIndent(`
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


const GlobalStylesPreset = stripIndent(`
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


const TSDeclarationsFile = stripIndent(`
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