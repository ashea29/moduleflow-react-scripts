import path from 'path';
import { exec } from 'child_process';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises';
import { stat, existsSync } from 'fs';
import { argv, exit } from 'process';
import chalk from 'react-dev-utils/chalk.js';
import commander from 'commander';
import inquirer from 'inquirer';
import cliProgress from 'cli-progress'

import {
  appRoot,
  srcPath,
  utilitiesStyledPath,
  utilitiesGlobalPath
} from './scriptUtils/scriptPaths.mjs'

import configurations from './scriptUtils/configureProject/configurationsIndex.mjs';
import files from './scriptUtils/configureProject/filesIndex.mjs';



const { Command } = commander
const { cyan, red, bgRed, green } = chalk
const yarn = existsSync(path.join(appRoot, 'yarn.lock'))


const progressBar = new cliProgress.SingleBar({
  format: 'CLI Progress |' + cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

const program = new Command()
const args = argv.slice(2)

let index = path.resolve(srcPath, 'index.tsx')
let rootReducter = path.resolve(srcPath, 'State/rootReducer.ts')
const packageJson = require(path.resolve(appRoot, 'package.json'))
const projectConfig = packageJson.projectPreferences


program
  .option('-s, --styled', 'Use styled-components')
  .option('-c, --css', 'Use CSS')
  .option('--scss', 'Use Sass (SCSS)')
  .option('-t, --theme', 'Add theme and global style presets')
  .option('-u, --utilities', 'Add utility styled components presets (i.e. - Container, Flex')
  .option('-a, --auth', 'Add Redux boilerplate for authentication')

program.parse(argv)
const options = program.opts()


const stylesPreference = {
    type: "checkbox",
    name: "Styles Preference",
    message: "What do you want to use for styling?",
    choices: [
      { 
        name: "CSS" 
      },
      {
        name: 'Sass (SCSS)'
      }, 
      { 
        name: "styled-components" 
      }
    ],
    when: (answers) => {
      return (!options.styled && !options.css && !options.scss) && !answers["Styles Preference"]
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
      return (answers["Styles Preference"]) && !options.theme
    }
}

const utilitiesPreference = {
    type: "confirm",
    name: "Utilities Preference",
    message: "Do you want to add utility presets (i.e. - Container, Flex, LoadingSpinner, etc.)?",
    default: true,
    when: (answers) => {
      return (answers["Styles Preference"]) && !options.utilities
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


const updateConfigPreferences = async (styles, theme, utilities, auth) => {
  const packageJson = require(path.resolve(appRoot, 'package.json'))
  projectConfig["styles"] = `${styles}`
  projectConfig["theme"] = `${theme}`
  projectConfig["utilities"] = `${utilities}`
  projectConfig["auth"] = `${auth}`
  const newPackageJson = JSON.stringify(packageJson, null, '\t')
  await writeFile(path.resolve(appRoot, 'package.json'), newPackageJson, {})
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

const generateFiles = async (filesList) => {
  try {
    const matchingConfig = configurations.find((c) => c.config === projectConfig)
    const filteredFileList = filesList.filter((file) => file.matchingConditions.includes(matchingConfig.name))
    const uniqueFiles = filteredFileList.length

    
    filteredFileList.forEach((file) => {
      await writeFile(
        path.resolve(file.path, file.name + file.extension), 
        JSON.parse(file.template),
        {}
      )
      console.log(cyan(file.name + file.extension) + ' file created!')
    })

  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
}


if (
    !options.styled    || 
    !options.css       ||
    !options.scss      ||
    !options.theme     ||
    !options.utilities ||
    !options.auth
  ) {
  inquirer.prompt([    
    stylesPreference,
    themeAndGlobalStylesPreference,
    utilitiesPreference,
    reduxAuthPreference
  ]).then(async (answers) => {
    const stylesPref = answers["Styles Preference"][0]
    const themePref = answers["Theme/Global Presets Preference"][0]
    const utilitiesPref = answers["Utilities Preference"][0]
    const authPref = answers["Redux Auth Preference"][0]
    await updateConfigPreferences(stylesPref, themePref, utilitiesPref, authPref)
    if (
      projectConfig["styles"] === 'styled-components'
    ) {
      console.log(cyan('Installing styled-components, styled-breakpoints, and types...'))
      installStyledComponents()
    }
    if (
      projectConfig["styles"] === 'styled-components' &&
      projectConfig["utilities"] === true
    ) {
      
      const utilitiesDirList = await readdir(utilitiesGlobalPath)

      if (!utilitiesDirList.includes('Styled')) {
        await mkdir(path.resolve(utilitiesStyledPath), { recursive: true })
        console.log(cyan(`'Styled' utilities directory created!`))
      }
    } 
    await generateFiles(files)
  }).catch((error) => {
    console.log(error)
    exit()
  })
}