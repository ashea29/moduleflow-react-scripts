const path = require('path')
const paths = require('../config/paths')
const { mkdir, writeFile, readFile, readdir } = require('fs/promises')
const { stat } = require('fs')
const { argv } = require('process') 
const stripIndent = require('moduleflow-react-dev-utils/stripIndent') 
const { Command } = require('moduleflow-react-dev-utils/commander')

const appRoot = path.resolve(paths.appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

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
let moduleExportsFile = `${basePath}/modules.ts`
let modulesReducer = './src/State/modulesReducer.ts'
let moduleRoutePath = moduleName.split(/(?=[A-Z])/).map(item => item.toLowerCase()).join('-')

const ModuleContent = stripIndent(`
  import React from 'react'
  import styles from './${moduleName}.module.css'
  
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


const ModuleLoadable = stripIndent(`
  import loadable from '@react-loadable/revised'
  const ${moduleName}Loadable = loadable({
    loader: () => import('./${moduleName}'),
  // SWAP FOR CUSTOM LOADING COMPONENT, IF DESIRED
    loading() { return <div>Loading...</div> }
  })
  export default ${moduleName}Loadable
`).trim()


const ModuleState = stripIndent(`
  import { createSlice } from '@reduxjs/toolkit'
  import { RootState } from '../../State/store'
  import { createSelector } from 'reselect'
  import { ${moduleName}Thunk } from './${moduleName}Thunks'
  interface Initial${moduleName}State {
    isLoading: Boolean
    ${moduleName}Data: {} | null
  }
  const initialState: Initial${moduleName}State = {
    isLoading: false,
    ${moduleName}Data: null
  }
  const ${moduleName}Slice = createSlice({
    name: '${moduleName}',
    initialState,
    reducers: {
      SET_DATA: (state, { payload }) => {
        state.${moduleName}Data = payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(${moduleName}Thunk.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(${moduleName}Thunk.fulfilled, (state, action) => {
        state.isLoading = false
      })
      builder.addCase(${moduleName}Thunk.rejected, (state, action) => {
        state.isLoading = false
      })
    }
  })
  export const { SET_DATA } = ${moduleName}Slice.actions
  export const selectEntities = createSelector(
    (state: RootState) => state.modules.${moduleName}, 
    (${moduleName}Data) => ${moduleName}Data
  )
  
  export default ${moduleName}Slice.reducer
`).trim()


const ModuleThunks = stripIndent(`
  import { createAsyncThunk } from '@reduxjs/toolkit'
  import { AppDispatch } from '../../State/store'


  interface ${moduleName}ThunkProps {
    fieldOne: string
  }

  interface ThunkAPI {
    dispatch: AppDispatch
    getState: Function
    extra?: any
    requestId: string
    signal: AbortSignal
  }

  export const ${moduleName}Thunk = createAsyncThunk(
    '${moduleName}/sample',
    async (thunkProps: ${moduleName}ThunkProps, thunkAPI: ThunkAPI) => {
      const dispatch = thunkAPI.dispatch
      try {
        setTimeout(() => {
          console.log('Sample output from thunk')
        }, 3000)
      } catch (error) {
        throw error
      }
    }
  )
`).trim()


const addToExportsAndReducer = async (modulesFile, reducerFile) => {
  try {
    const basePathContents = await readdir(basePath)
    let numberOfModules = 0

    basePathContents.forEach((item) => {
      stat(basePath + '/' + item, (error, stats) => {
        if (stats.isDirectory()) {
          numberOfModules++
        }
      }) 
    })

    const data = await readFile(modulesFile)
    const lines = data.toString().split(/\n/)

    if (numberOfModules === 0) {
      lines.splice(numberOfModules, 0, `import ${moduleName}Loadable from './${moduleName}/${moduleName}Loadable'`)
    } else {
      lines.splice(numberOfModules - 1, 0, `import ${moduleName}Loadable from './${moduleName}/${moduleName}Loadable'`)
    }
    
    lines.splice(lines.length - 4, 0, `\t${moduleName}Loadable,`)
    const updatedFileContent = lines.join('\n')
    await writeFile(modulesFile, updatedFileContent, {})
    console.log(`New module '${moduleName}' added to exports in 'modules.ts'`)

    const reducerData = await readFile(reducerFile)
    const reducerLines = reducerData.toString().split(/\n/)

    if (numberOfModules === 0) {
      reducerLines.splice(numberOfModules + 1, 0, `import ${moduleName}Reducer from '../Modules/${moduleName}/${moduleName}Slice'`)
    } else {
      reducerLines.splice(numberOfModules, 0, `import ${moduleName}Reducer from '../Modules/${moduleName}/${moduleName}Slice'`)
    }

    reducerLines.splice(reducerLines.length - 2, 0, `\t${moduleName}: ${moduleName}Reducer,`)
    const updatedReducerContent = reducerLines.join('\n')
    await writeFile(reducerFile, updatedReducerContent, {})

    console.log(`'${moduleName}' reducer added to 'modulesReducer'`)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
  }
}


const createModule = async () => {
  try {
    await mkdir(basePath + `${moduleName}`, { recursive: true })
    console.log(moduleName + ' directory created!')

    await mkdir(basePath + `${moduleName}/components`, { recursive: true })
    console.log(moduleName + ' components directory created!')
      
    const files = [
      {name: moduleName, extension: '.module.css'},
      {name: moduleName, extension: '.tsx'},
      {name: moduleName, extension: 'Loadable.tsx'},
      {name: moduleName, extension: 'Thunks.ts'},
      {name: moduleName, extension: 'Slice.spec.ts'},
      {name: moduleName, extension: 'Slice.ts'} 
    ]
  
    files.forEach(async (file) => {
      if (file.extension === '.tsx') {
        await writeFile(
          basePath + `${moduleName}/` + (file.name + file.extension), 
          ModulePageContent, 
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (file.extension === 'Loadable.tsx') {
        await writeFile(
          basePath + `${moduleName}/` + (file.name + file.extension), 
          ModulePageLoadable,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (file.extension === 'Slice.ts') {
        await writeFile(
          basePath + `${moduleName}/` + (file.name + file.extension), 
          ModulePageState,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else if (file.extension === 'Thunks.ts') {
        await writeFile(
          basePath + `${moduleName}/` + (file.name + file.extension), 
          ModulePageThunks,
          {}
        )
        console.log(`'${file.name + file.extension}' file created!`)
      } else {
        await writeFile(basePath + `${moduleName}/` + (file.name + file.extension), '', {})
        console.log(`'${file.name + file.extension}' file created!`)
      }
    })
    addToExportsAndReducer(moduleExportsFile, modulesReducer)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
  }
}

createModule()