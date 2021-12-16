import path from 'path'
import { appPath } from 'moduleflow-react-scripts/config/paths'
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { stat } from 'fs'
import { argv } from 'process' 
import stripIndent from 'react-dev-utils/stripIndent.mjs' 
import commander from 'react-dev-utils/commander.mjs'

const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src')

const { Command } = commander
const program = new Command()
const args = argv.slice(2)

program
  .option('-v, --view', 'Module is a view or "page"')
  .option('-c, --component', 'Module is a component')
  .option('-s, --styled', 'Module should use styled-components for styling instead of CSS')
  .option('-r, --root', `Module is the application's root path (i.e., "/")`)
  .option('-p, --protected', 'Module is a protected route')
  .option('-e, --exact', `Module route should have the "exact" prop`)


program.parse(argv)
const options = program.opts()

let moduleName = args[0]
let componentsDir = path.resolve(basePath, 'Components/components')
let componentExports = path.resolve(basePath, 'Components/componentExports.ts')
let viewsDir = path.resolve(basePath, 'Views/views')
let viewExports = path.resolve(basePath, 'Views/viewExports.ts')
let moduleRoutePath = moduleName.split(/(?=[A-Z])/).map(item => item.toLowerCase()).join('-')

const exportsFile = () => {
  if (options.view) {
    return viewExports
  } else if (options.component) {
    return componentExports
  }
}

const modulesDir = () => {
  if (options.view) {
    return viewsDir
  } else if (options.component) {
    return componentsDir
  }
}


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
    `import ${moduleName} from '../../Styled/${moduleName}.styled'`
    : `import styles from './${moduleName}.module.css'`
  }
  
  const ${moduleName}: React.FC = (props: any) => {
    return (
      <div>
        ${moduleName}
      </div>
    )
  }
  export default ${moduleName}
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


  const ${moduleName}Loadable = loadable(() => {
    pTimeout(import('./${moduleName}'), 10000, 'Element failed to load')
  })

  export default ${moduleName}Loadable
`).trim()


const TestFileContent = stripIndent(`
  describe('${moduleName}', () => {

  });
`).trim()



const addToExports = async (exportsFile, modulesDir) => {
  try {
    const basePathContents = await readdir(modulesDir())
    let numberOfModules = 0

    basePathContents.forEach((item) => {
      stat(basePath + '/' + item, (error, stats) => {
        if (stats.isDirectory()) {
          numberOfModules++
        }
      }) 
    })

    const data = await readFile(exportsFile())
    const lines = data.toString().split(/\n/)

    if (numberOfModules === 0) {
      lines.splice(numberOfModules, 0, `import ${moduleName} from './${moduleName}/${moduleName}Loadable'`)
    } else {
      lines.splice(numberOfModules - 1, 0, `import ${moduleName} from './${moduleName}/${moduleName}Loadable'`)
    }
    
    lines.splice(lines.length - 4, 0, `\t${moduleName},`)
    const updatedFileContent = lines.join('\n')
    await writeFile(modulesFile, updatedFileContent, {})

    console.log(`New module '${moduleName}' added to exports in 'modules.ts'`)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
  }
}


const createModule = async () => {
  try {
    await mkdir(modulesDir() + `${moduleName}`, { recursive: true })
    console.log(moduleName + ' directory created!')

    await mkdir(modulesDir() + `${moduleName}/components`, { recursive: true })
    console.log(moduleName + ' components directory created!')
      
    const files = options.styled ? [
      {name: moduleName, extension: '.tsx'},
      {name: moduleName, extension: 'Loadable.tsx'},
      {name: moduleName, extension: '.spec.ts'}
    ] : [
      {name: moduleName, extension: '.module.css'},
      {name: moduleName, extension: '.tsx'},
      {name: moduleName, extension: 'Loadable.tsx'},
      {name: moduleName, extension: '.spec.ts'}
    ]
  
    files.forEach(async (file) => {
      if (options.view && file.extension === '.tsx') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          ViewContent, 
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (options.component && file.extension === '.tsx') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          ComponentContent, 
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (file.extension === '.module.css') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          '', 
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (options.view && file.extension === 'Loadable.tsx') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          ViewLoadable,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (options.component && file.extension === 'Loadable.tsx') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          ComponentLoadable,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (file.extension === '.spec.ts') {
        await writeFile(
          modulesDir() + `${moduleName}/` + (file.name + file.extension), 
          TestFileContent,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else {
        await writeFile(modulesDir() + `${moduleName}/` + (file.name + file.extension), '', {})
        console.log(`'${file.name + file.extension}' file created!`)
      }
    })
    addToExports(exportsFile, modulesDir)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
  }
}

createModule()