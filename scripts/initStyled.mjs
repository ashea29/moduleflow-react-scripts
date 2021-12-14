import path from 'path';
import paths from 'moduleflow-react-scripts/config/paths.js';
import { exec } from 'child_process';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises';
import { stat } from 'fs';
import { argv } from 'process';
import chalk from 'moduleflow-react-dev-utils/chalk.js';
import stripIndent from 'moduleflow-react-dev-utils/stripIndent.mjs'; 
import commander from 'moduleflow-react-dev-utils/commander.mjs';


const { Command } = commander
const { appPath } = paths
const { cyan, red, bgRed, green } = chalk
const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

const program = new Command()
const args = argv.slice(2)

program
  .option('-t, --theme', 'Use theme presets and boilerplate')
  .option('-u, --utilities', 'Use utility styled components presets (i.e. - Container, Flex')

program.parse(argv)
const options = program.opts()


const installStyledComponents = () => {
  console.log(cyan('Installing styled-components package...'))
  exec(
    `npm install --prefix ${JSON.stringify(appPath)} styled-components`, 
    (error, stdout, stderr) => {
      if (error) {
        console.log(`${red('Error')}: ${error}`)
        return
      }
      if (stderr) {
        console.log(`${bgRed('stderr')}: ${stderr}`)
        return
      }
      console.log(`${green('styled-components')} successfully installed!`)
    }
  )
}

installStyledComponents()