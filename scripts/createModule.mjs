import path from 'path'
import { appPath } from 'moduleflow-react-scripts/config/paths'
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { stat } from 'fs'
import { argv, exit } from 'process'
import chalk from 'react-dev-utils/chalk.js';
import stripIndent from 'strip-indent' 
import commander from 'commander'
import inquirer from 'inquirer'

const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src')

const { Command } = commander
const program = new Command()
const args = argv.slice(2)

program
  .option('-v, --view', 'Module is a view or "page"')
  .option('-c, --component', 'Module is a component')
  .option('-s, --styled', 'Module should use styled-components instead of CSS')
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
let componentsDir = path.resolve(basePath, 'Components/components')
let styledDir = path.resolve(basePath, 'Components/Styled')
let componentExports = path.resolve(basePath, 'Components/componentExports.ts')
let viewsDir = path.resolve(basePath, 'Views/views')
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
    return viewsDir
  } else if (options.component) {
    return componentsDir
  } else if (altVariable) {
    return path.resolve(
      basePath, 
      `${altVariable}s/${altVariable.toLowerCase()}s`
    )
  }
}



// TEMPLATES FOR FILE CREATION
const ViewContent = stripIndent(`
  import React from 'react'

  
  const ${moduleName}: React.FC = (props: any) => {
    return (
      <div>
        ${moduleName}
      </div>
    )
  }

  export default {
    routeProps: {
      path: '/${options.root ? '' : moduleRoutePath}',
      exact: ${options.root || options.exact ? true : false},
      component: ${moduleName}
    },
    name: '${moduleName}',
    protectedRoute: ${options.protected ? true : false}
  }
`).trim()


const ComponentContent = stripIndent(`
  import React from 'react'
  ${options.styled ? 
    `import Styled${moduleName} from '../../Styled/${moduleName}.styled'`
    : `import styles from './${moduleName}.module.css'`
  }
  
  const ${moduleName}: React.FC = (props: any) => {
    return (
      ${options.styled ?
      `<Styled${moduleName}>
          ${moduleName}
      </Styled${moduleName}>`
        : 
      `<div>
        ${moduleName}
      </div>` 
      }
    )
  }
  export default ${moduleName}
`).trim()


const StyledComponentContent = stripIndent(`
  import styled from 'styled-components'

  const Styled${moduleName} = styled.div\`

  \`

  export default Styled${moduleName}
`).trim()


const ViewLoadable = stripIndent(`
  import loadable from '@loadable/component'
  import pTimeout from 'p-timeout';
  import pMinDelay from 'p-min-delay'

  const timeoutComponentPath = '../../../utilities/components/Timeout'
  const loaderComponentPath = '../../../utilities/components/FullscreenSpinner'

  const FallbackComponent = loadable(() =>
    pMinDelay(import(\`\${loaderComponentPath}\`), 300)
  )

  const ${moduleName}Loadable = loadable(() =>
    pTimeout(import('./${moduleName}'), 10000, () => import(\`\${timeoutComponentPath}\`)), {
      fallback: <FallbackComponent />
    }
  )

  export default ${moduleName}Loadable
`).trim()


const ComponentLoadable = stripIndent(`
  import loadable from '@loadable/component'
  import pTimeout from 'p-timeout';


  const ${moduleName}Loadable = loadable(() =>
    pTimeout(import('./${moduleName}'), 10000, 'Element failed to load')
  )

  export default ${moduleName}Loadable
`).trim()


const TestFileContent = stripIndent(`
  describe('${moduleName}', () => {

  });
`).trim()



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

      if (lines.length < 4) {
        const missing = (4 - lines.length)
        
        for (let i = 1; i <= missing; i++) {
          lines.push(/\n/)
        }
      }

      if (numberOfModules === 0) {
        lines.splice(numberOfModules, 0, `import * as ${moduleName} from './${moduleName}/${moduleName}Loadable'`)
        lines.splice(((numberOfModules * 2) + 2), 0, `${moduleName}: typeof ${moduleName}`)
      } else {
        lines.splice(numberOfModules - 1, 0, `import * as ${moduleName} from './${moduleName}/${moduleName}Loadable'`)
        lines.splice(((numberOfModules * 2) + 2), 0, `${moduleName}: typeof ${moduleName}`)
      }
    } else {
      if (numberOfModules === 0) {
        lines.splice(numberOfModules, 0, `import ${moduleName} from './components/${moduleName}/${moduleName}Loadable'`)
      } else {
        lines.splice(numberOfModules - 1, 0, `import ${moduleName} from './components/${moduleName}/${moduleName}Loadable'`)
      }
      lines.splice(lines.length - 4, 0, `\t${moduleName},`)
    }

    
    const updatedFileContent = lines.join('\n')
    await writeFile(exportsFile, updatedFileContent, {})

    console.log(`New ${selectedModuleType.toLowerCase()} ${cyan(moduleName)} added to exports in '${selectedModuleType.toLowerCase()}Exports.ts'`)
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
          ComponentContent, 
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
        (options.view || selectedModuleType === 'View') 
        && file.extension === '.tsx'
      ) {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          ViewContent, 
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
              StyledComponentContent, 
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
            ViewLoadable,
            {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (
          (options.component || selectedModuleType === 'Component')
          && file.extension === 'Loadable.tsx'
        ) {
          await writeFile(
            modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
            ComponentLoadable,
            {}
          )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === '.spec.ts') {
        await writeFile(
          modulesDir(selectedModuleType) + `/${moduleName}/` + (file.name + file.extension), 
          TestFileContent,
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
}