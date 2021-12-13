const path = require('path')
const paths = require('../config/paths')
const { exec } = require('child_process')
const { mkdir, writeFile, readFile, readdir } = require('fs/promises')
const { stat } = require('fs')
const { argv } = require('process')
const chalk = require('moduleflow-react-dev-utils/chalk')
const stripIndent = require('moduleflow-react-dev-utils/stripIndent') 
const { Command } = require('moduleflow-react-dev-utils/commander')


const appRoot = path.resolve(paths.appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

const program = new Command()
const args = argv.slice(2)

program
  .option('-t, --theme', 'Use theme presets and boilerplate')
  .option('-u, --utilities', 'Use utility styled components presets (i.e. - Container, Flex')

program.parse(argv)
const options = program.opts()

const installStyledComponents = () => {
  console.log(chalk.cyan('Installing styled-components package...'))
  exec(
    `npm install --prefix ${path.resolve(appRoot)} styled-components`, 
    (error, stdout, stderr) => {
      if (error) {
        console.log(`${chalk.red('Error')}: ${error}`)
      }
      if (stderr) {
        console.log(`${chalk.bgRed('stderr')}: ${stderr}`)
      }
      console.log(`${chalk.green('styled-components')} successfully installed!`)
    }
  )
}

installStyledComponents()
