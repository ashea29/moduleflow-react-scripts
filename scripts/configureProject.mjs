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
  LoadingSpinner, 
  LoadingSpinnerCSS, 
  LoadingSpinnerStyled,
  FullscreenSpinner,
  FullscreenSpinnerCSS, 
  FullscreenSpinnerStyled, 
  ThemePreset, 
  GlobalStylesPreset,
  GlobalStylesCSSPreset, 
  TSDeclarationsFile,
  ReduxAuthFile,
  ReduxAuthThunksFile
} from './templates/configureProjectTemplates'



const require = createRequire(import.meta.url)
const { Command } = commander
const { appPath } = paths
const { cyan, red, bgRed, green } = chalk
const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')
const srcPath = path.resolve(appRoot, 'src')
const statePath = path.resolve(appRoot, 'src/State')
const utilitiesComponentsPath = path.resolve(appRoot, 'src/utilities/components')
const utilitiesStyledPath = path.resolve(appRoot, 'src/utilities/Styled')
const yarn = existsSync(path.join(appRoot, 'yarn.lock'))

const program = new Command()
const args = argv.slice(2)

let index = path.resolve(srcPath, 'index.tsx')


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

const generateFiles = async (answers) => {
  try {
    if (answers["Styles Preference"][0] === "styled-components" || options.styled) {
      await mkdir(path.resolve(utilitiesStyledPath), { recursive: true })
      console.log(cyan(`'Styled' utilities directory created!`))

      const files = [
        {name: 'LoadingSpinner', extension: '.tsx'},
        {name: 'FullscreenSpinner', extension: '.tsx'},
        {name: 'LoadingSpinner', extension: '.styled.ts'},
        {name: 'FullscreenSpinner', extension: '.styled.ts'},
        {name: 'styled', extension: '.d.ts'}
      ]

      files.forEach((file) => {
        if (file.extension === '.tsx' && file.name === 'LoadingSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            LoadingSpinner(answers),
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.styled.ts' && file.name === 'LoadingSpinner') {
          await writeFile(
            path.resolve(utilitiesStyledPath, file.name + file.extension), 
            LoadingSpinnerStyled,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.tsx' && file.name === 'FullscreenSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            FullscreenSpinner(answers),
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.styled.ts' && file.name === 'FullscreenSpinner') {
          await writeFile(
            path.resolve(utilitiesStyledPath, file.name + file.extension), 
            FullscreenSpinnerStyled,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.d.ts') {
          await writeFile(
            path.resolve(srcPath, file.name + file.extension), 
            TSDeclarationsFile,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
      })
    } 
    
    if (answers["Styles Preference"][0] === "CSS" || options.css) {
      const files = [
        {name: 'LoadingSpinner', extension: '.tsx'},
        {name: 'FullscreenSpinner', extension: '.tsx'},
        {name: 'LoadingSpinner', extension: '.css'},
        {name: 'FullscreenSpinner', extension: '.css'}
      ] 
      files.forEach((file) => {
        if (file.extension === '.tsx' && file.name === 'LoadingSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            LoadingSpinner(answers),
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.css' && file.name === 'LoadingSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            LoadingSpinnerCSS,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.tsx' && file.name === 'FullscreenSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            FullscreenSpinner(answers),
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.css' && file.name === 'FullscreenSpinner') {
          await writeFile(
            path.resolve(utilitiesComponentsPath, file.name + file.extension), 
            FullscreenSpinnerCSS,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
      })
    } 
    
    if (answers["Theme/Global Presets Preference"] === true || options.theme) {
      const themePath = path.resolve(srcPath, 'theme')
      await mkdir(themePath, { recursive: true })
      console.log(cyan('theme') + 'directory created!')

      const files = 
        options.styled || 
        answers["Styles Preference"][0] === "styled-components" ? 
      [
        {name: 'Theme', extension: '.ts'},
        {name: 'Global', extension: '.ts'}
      ] :
      [
        {name: 'Theme', extension: '.ts'},
        {name: 'Global', extension: '.css'}
      ]
      files.forEach((file) => {
        if (file.extension === '.ts' && file.name === 'Theme') {
          await writeFile(
            path.resolve(themePath, file.name + file.extension), 
            ThemePreset,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.ts' && file.name === 'Global') {
          await writeFile(
            path.resolve(themePath, 'Styled', file.name + file.extension), 
            GlobalStylesPreset,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.extension === '.css' && file.name === 'Global') {
          await writeFile(
            path.resolve(themePath, file.name + file.extension), 
            GlobalStylesCSSPreset,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
      })

      const data = await readFile(index)
      const lines = data.toString().split(/\n/)

      if (
        options.styled || 
        answers["Styles Preference"][0] === "styled-components"
      ) {
        
      }
    }


    if (
      (answers["Utilities Preference"] === true || options.utilities) &&
      (answers["Styles Preference"][0] === "styled-components" || options.styled)
    ) {
      const files = [
        {name: 'Container', extension: '.styled.ts'},
        {name: 'Flex', extension: '.styled.ts'}
      ] 

      files.forEach((file) => {
        if (file.name === 'Container') {
          await writeFile(
            path.resolve(utilitiesStyledPath, file.name + file.extension), 
            ContainerUtility,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.name === 'Flex') {
          await writeFile(
            path.resolve(utilitiesStyledPath, file.name + file.extension), 
            FlexUtility,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
      })
    }

    if (answers["Redux Auth Preference"] === true || options.auth) {
      const authPath = path.resolve(statePath, 'auth')
      await mkdir(authPath, { recursive: true })
      console.log(cyan('auth') + 'directory created!')

      const files = [
        {name: 'auth', extension: '.ts'},
        {name: 'authThunks', extension: '.ts'}
      ] 

      files.forEach((file) => {
        if (file.name === 'auth') {
          await writeFile(
            path.resolve(authPath, file.name + file.extension), 
            ReduxAuthFile,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
        else if (file.name === 'authThunks') {
          await writeFile(
            path.resolve(authPath, file.name + file.extension), 
            ReduxAuthThunksFile,
            {}
          )
          console.log(cyan(file.name + file.extension) + ' file created!') 
        }
      })
    }
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
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
    } 
    generateFiles(answers)
  }).catch((error) => {
    console.log(error)
    exit()
  })
}