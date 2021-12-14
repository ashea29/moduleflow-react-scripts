import path from 'path';
import paths from 'moduleflow-react-scripts/config/paths.js';
import { exec } from 'child_process';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises';
import { stat } from 'fs';
import { argv } from 'process';
import chalk from 'react-dev-utils/chalk.js';
import stripIndent from 'strip-indent'; 
import commander from 'commander';


const { Command } = commander
const { appPath } = paths
const { cyan, red, bgRed, green } = chalk
const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

const program = new Command()
const args = argv.slice(2)

program
  .option('--typescript', 'Use TypeScript, and install type definitions')
  .option('-t, --theme', 'Use theme presets and boilerplate')
  .option('-u, --utilities', 'Use utility styled components presets (i.e. - Container, Flex')

program.parse(argv)
const options = program.opts()


const installStyledComponents = () => {
  console.log(cyan('Installing styled-components package...'))
  exec(
    `npm install --prefix ${JSON.stringify(appPath)} styled-components ${
      options.typescript 
      ? '@types/styled-components' 
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
      console.log(`${green('styled-components')} successfully installed!`)
    }
  )
}

installStyledComponents()