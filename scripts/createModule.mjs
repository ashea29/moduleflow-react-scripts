import path from 'path'
import { appPath } from 'moduleflow-react-scripts/config/paths'
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { stat } from 'fs'
import { argv, exit } from 'process'
import chalk from 'react-dev-utils/chalk.js';
import commander from 'commander'
import inquirer from 'inquirer'

import { 
  ViewContent,
  ViewLoadable,
  ComponentContent,
  ComponentLoadable,
  StyledComponentContent,
  TestFileContent
} from './templates/createModuleTemplates'

const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')
const { cyan, red, bgRed, green } = chalk

const { Command } = commander
const program = new Command()
const args = argv.slice(2)

program
  .option('-v, --view', 'Module is a view or "page"')
  .option('-c, --component', 'Module is a component')
  .option('-r, --root', `Module is the application's root path (i.e., "/")`)
  .option('-p, --protected', 'Module is a protected route')
  .option('-e, --exact', `Module route should have the "exact" prop`)


program.parse(argv)
const options = program.opts()


let selectedModuleType

const noModuleTypeSelected = {
  type: "checkbox",
  name: "Module Type",
  message: "Please specify whether the new module is a view or a component: ",
  choices: [
    { 
      name: "View" 
    }, 
    { 
      name: "Component" 
    }
  ],
  validate(answer) {
    if (answer.length < 1) {
      return 'You must select an option'
    }
    return true
  }
}


let moduleName = args[0]
let componentsDir = path.resolve(basePath, 'Components/componentModules')
let styledDir = path.resolve(basePath, 'Components/Styled')
let componentExports = path.resolve(basePath, 'Components/componentExports.ts')
let viewsDir = path.resolve(basePath, 'Views/viewModules')
let viewExports = path.resolve(basePath, 'Views/viewExports.ts')
let moduleRoutePath = moduleName.split(/(?=[A-Z])/).map(item => item.toLowerCase()).join('-')

const exportsFile = (altVariable) => {
  if (options.view) {
    return viewExports
  } else if (options.component) {
    return componentExports
  } else if (altVariable) {
    return path.resolve(
      basePath, 
      `${altVariable}s/${altVariable.toLowerCase()}Exports.ts`
    )
  }
}

const modulesDir = (altVariable) => {
  if (options.view) {
    return path.resolve(viewsDir)
  } else if (options.component) {
    return path.resolve(componentsDir)
  } else if (altVariable) {
    return path.resolve(
      basePath, 
      `${altVariable}s/${altVariable.toLowerCase()}Modules`
    )
  }
}



const addToExports = async (exportsFile, modulesDir) => {
  try {
    const basePathContents = await readdir(modulesDir)
    let numberOfModules = 0

    basePathContents.forEach((item) => {
      stat(path.resolve(modulesDir, item), (error, stats) => {
        if (stats.isDirectory()) {
          numberOfModules++
        }
      }) 
    })


    const data = await readFile(exportsFile)
    const lines = data.toString().split(/\n/)


    if (selectedModuleType === 'Component') {
      if (numberOfModules === 0) {
        lines.splice(numberOfModules, 0, `import * as ${moduleName} from './componentModules/${moduleName}/${moduleName}Loadable'`)
        lines.push(`export const ${entityName} = ${entityName}`)
      } else {
        lines.splice(numberOfModules - 1, 0, `import * as ${moduleName} from './componentModules/${moduleName}/${moduleName}Loadable'`)
        lines.push(`export const ${entityName} = ${entityName}`)
      }
    } else {
      if (numberOfModules === 0) {
        lines.splice(numberOfModules, 0, `import ${moduleName} from './viewModules/${moduleName}/${moduleName}Loadable'`)
      } else {
        lines.splice(numberOfModules - 1, 0, `import ${moduleName} from './viewModules/${moduleName}/${moduleName}Loadable'`)
      }
      lines.splice(lines.length - 4, 0, `\t${moduleName},`)
    }

    const updatedFileContent = lines.join('\n')
    await writeFile(exportsFile, updatedFileContent, {})

    selectedModuleType ?
      console.log(`New ${selectedModuleType.toLowerCase()} ${cyan(moduleName)} added to exports in '${selectedModuleType.toLowerCase()}Exports.ts'`)
      : console.log(`New ${options.view ? 'view' : 'component'} ${cyan(moduleName)} added to exports in '${options.view ? 'view' : 'component'}Exports.ts'`) 
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
}


const createModule = async () => {
  try {
    await mkdir(modulesDir(selectedModuleType) + `/${moduleName}`, { recursive: true })
    console.log(cyan(moduleName) + ' directory created!')
      
    const files = options.styled ? [
      {name: moduleName, extension: '.tsx'},
      {name: moduleName, extension: 'Loadable.tsx'},
      {name: moduleName, extension: '.spec.ts'},
      {name: moduleName, extension: '.styled.ts'}
    ] : [
      {name: moduleName, extension: '.module.css'},
      {name: moduleName, extension: '.tsx'},
      {name: moduleName, extension: 'Loadable.tsx'},
      {name: moduleName, extension: '.spec.ts'}
    ]
  
    files.forEach(async (file) => {
      if (
        (options.component || selectedModuleType === 'Component') 
        && file.extension === '.tsx'
      ) {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          ComponentContent(moduleName, options), 
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
        (options.view || selectedModuleType === 'View') 
        && file.extension === '.tsx'
      ) {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          ViewContent(moduleName, moduleRoutePath, options), 
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
          (options.component || selectedModuleType === 'Component')
          && options.styled 
          && file.extension === '.styled.ts'
        ) {
            await writeFile(
              styledDir + '/' + (file.name + file.extension), 
              StyledComponentContent(moduleName), 
              {}
            )
            console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === '.module.css') {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          '', 
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
          (options.view || selectedModuleType === 'View')
          && file.extension === 'Loadable.tsx'
        ) {
          await writeFile(
            modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
            ViewLoadable(moduleName),
            {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
          (options.component || selectedModuleType === 'Component')
          && file.extension === 'Loadable.tsx'
        ) {
          await writeFile(
            modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
            ComponentLoadable(moduleName),
            {}
          )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === '.spec.ts') {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          TestFileContent(moduleName),
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension),
          '',
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      }
    })
    await addToExports(exportsFile(selectedModuleType), modulesDir(selectedModuleType))
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
}


if (!options.view && !options.component) {
  inquirer.prompt([
    noModuleTypeSelected
  ]).then((answers) => {
    console.log(answers['Module Type'][0])
    selectedModuleType = answers['Module Type'][0]
    createModule()
  }).catch((error) => {
    console.log(error)
    exit()
  })
} else {
  createModule()
  .catch((error) => console.log(error))
}