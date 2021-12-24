import path from 'path';
import paths from 'moduleflow-react-scripts/config/paths.js';
import { exec } from 'child_process';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises';
import { stat, existsSync } from 'fs';
import { argv, exit } from 'process';
import chalk from 'react-dev-utils/chalk.js';
import commander from 'commander';
import inquirer from 'inquirer'
import { createRequire } from 'module'

import { 
  ContainerUtility, 
  FlexUtility, 
  LoadingSpinnerCSS, 
  LoadingSpinnerStyled,
  FullscreenSpinnerCSS, 
  FullscreenSpinnerStyled, 
  ThemePreset, 
  GlobalStylesPreset, 
  TSDeclarationsFile 
} from './templates/configureProjectTemplates'



const require = createRequire(import.meta.url)
const { Command } = commander
const { appPath } = paths
const { cyan, red, bgRed, green } = chalk
const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')
const utilitiesComponentsPath = path.resolve(appRoot, 'src/utilities/components')
const utilitiesStyledPath = path.resolve(appRoot, 'src/utilities/Styled')
const yarn = existsSync(path.join(appRoot, 'yarn.lock'))

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
    when: (answers) => {
      return (!options.styled && !options.css) && !answers["Styles Preference"]
    },
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
    default: true,
    when: (answers) => {
      return (options.styled || answers["Styles Preference"]) && !options.theme
    }
}

const utilitiesPreference = {
    type: "confirm",
    name: "Utilities Preference",
    message: "Do you want to add utility styled components presets (i.e. - Container, Flex)?",
    default: true,
    when: (answers) => {
      return (options.styled || answers["Styles Preference"]) && !options.utilities
    }
}

const reduxAuthPreference = {
    type: "confirm",
    name: "Redux Auth Preference",
    message: "Do you want to add minimal Redux boilerplate for authentication?",
    default: true,
    when: (answers) => {
      return (!options.auth && !answers["Redux Auth Preference"])
    }
}


const updateStylesPreference = (preference) => {
  console.log(cyan('Installing styled-components...'))
  const packageJson = require(path.resolve(appRoot, 'package.json'))
  packageJson.projectPreferences.styles = `${preference}`
  const newPackageJson = JSON.stringify(packageJson, null, '\t')
  writeFile(path.resolve(appRoot, 'package.json'), newPackageJson, {})
  return
}


const installStyledComponents = () => {
  exec(
    `${yarn ? 
        `yarn --cwd ${JSON.stringify(path.resolve(appRoot))} add styled-components styled-breakpoints @types/styled-components` 
        : `npm install --prefix ${JSON.stringify(path.resolve(appRoot))} styled-components styled-breakpoints @types/styled-components`
     }`, 
    (error, stdout, stderr) => {
      if (error) {
        console.log(`${bgRed(error)}`)
        exit()
      }
      if (stderr) {
        console.log(`${bgRed(stderr)}`)
        exit()
      }
      console.log(
        `${green('styled-components, styled-breakpoints, @types/styled-components')} successfully installed!`
      )
    }
  )
}

if (
    !options.styled    || 
    !options.css       ||
    !options.theme     ||
    !options.utilities ||
    !options.auth
  ) {
  inquirer.prompt([    
    stylesPreference,
    themeAndGlobalStylesPreference,
    utilitiesPreference,
    reduxAuthPreference
  ]).then((answers) => {
    const stylesPreference = answers["Styles Preference"][0]
    updateStylesPreference(stylesPreference)
    if (
      options.styled || 
      answers["Styles Preference"][0] === "styled-components"
    ) {
      installStyledComponents()
    } else if (
      options.css ||
      answers["Styles Preference"][0] === "css"
    ) {

    }
  }).catch((error) => {
    console.log(error)
    exit()
  })
}