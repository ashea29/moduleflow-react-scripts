import path from 'path';
import { appPath } from 'moduleflow-react-scripts/config/paths';
import chalk from 'react-dev-utils/chalk.js';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { stat } from 'fs'
import { argv, exit } from 'process' 
import stripIndent from 'strip-indent'


const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/State')
const { cyan, red, bgRed, green } = chalk

const entitiesPath = path.resolve(appRoot, 'src/State/Entities')
const entityExportsFile = `${basePath}/Entities/entityExports.ts`
const entityReducerFile = `${basePath}/entitiesReducer.ts`
const args = argv.slice(2)

let entityName = args[0]


const EntitySliceContent = stripIndent(`
  import { createSlice } from '@reduxjs/toolkit'
  import { RootState } from '../../State/store'
  import { createSelector } from 'reselect'
  import { ${entityName}Thunk } from './${entityName}Thunks'


  interface Initial${entityName}State {
    isLoading: Boolean
    ${entityName}Data: {} | null
  }

  const initialState: Initial${entityName}State = {
    isLoading: false,
    ${entityName}Data: null
  }

  const ${entityName}Slice = createSlice({
    name: '${entityName}',
    initialState,
    reducers: {
      SET_DATA: (state, { payload }) => {
        state.${entityName}Data = payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(${entityName}Thunk.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(${entityName}Thunk.fulfilled, (state, action) => {
        state.isLoading = false
      })
      builder.addCase(${entityName}Thunk.rejected, (state, action) => {
        state.isLoading = false
      })
    }
  })

  export const { SET_DATA } = ${entityName}Slice.actions

  export const select${entityName[0].toUpperCase + entityName.slice(1)} = createSelector(
    (state: RootState) => state.modules.${entityName}, 
    (${entityName}Data) => ${entityName}Data
  )
  
  export default ${entityName}Slice.reducer
`).trim()


const EntityThunksContent = stripIndent(`
  import { createAsyncThunk } from '@reduxjs/toolkit'
  import { AppDispatch } from '../../State/store'


  interface ${entityName}ThunkProps {
    fieldOne: string
  }

  interface ThunkAPI {
    dispatch: AppDispatch
    getState: Function
    extra?: any
    requestId: string
    signal: AbortSignal
  }

  export const ${entityName}Thunk = createAsyncThunk(
    '${entityName}/sample',
    async (thunkProps: ${entityName}ThunkProps, thunkAPI: ThunkAPI) => {
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


const EntityTestContent = stripIndent(`
  describe('${entityName} state', () => {

  });
`).trim()


const addToReducerAndExports = async (reducerFile, exportsFile) => {
  try {
    const entitiesPathContents = await readdir(entitiesPath)
    let numberOfEntities = 0

    entitiesPathContents.forEach((item) => {
      stat(entitiesPath + '/' + item, (error, stats) => {
        if (stats.isDirectory()) {
          numberOfEntities++
        }
      }) 
    })

    const data = await readFile(exportsFile)
    const lines = data.toString().split(/\n/)


    if (numberOfEntities === 0) {
      lines.splice(numberOfEntities, 0, `import * as ${entityName}Slice from './${entityName}/${entityName}'`)
      lines.push(`export const ${entityName} = ${entityName}Slice`)
    } else {
      lines.splice(numberOfEntities - 1, 0, `import * as ${entityName}Slice from './${entityName}/${entityName}'`)
      lines.push(`export const ${entityName} = ${entityName}Slice`)
    }
    
    const updatedFileContent = lines.join('\n')
    await writeFile(exportsFile, updatedFileContent, {})
    console.log(`New entity ${cyan(entityName)} added to exports in 'entityExports.ts'`)

    const reducerData = await readFile(reducerFile)
    const reducerLines = reducerData.toString().split(/\n/)

    if (numberOfEntities === 0) {
      reducerLines.splice(numberOfEntities + 1, 0, `import ${entityName}Reducer from './Entities/${entityName}/${entityName}'`)
    } else {
      reducerLines.splice(numberOfEntities, 0, `import ${entityName}Reducer from './Entities/${entityName}/${entityName}'`)
    }

    reducerLines.splice(reducerLines.length - 2, 0, `\t${entityName}: ${entityName}Reducer,`)
    const updatedReducerContent = reducerLines.join('\n')
    await writeFile(reducerFile, updatedReducerContent, {})

    console.log(cyan(entityName) + ` reducer added to 'entitiesReducer.ts'`)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
}


const createEntity = async () => {
  try {
    await mkdir(entitiesPath + `/${entityName}`, { recursive: true })
    console.log(cyan(entityName) + ' directory created!')
      
    const files = [
      {name: entityName, extension: '.ts'},
      {name: entityName, extension: 'Thunks.ts'},
      {name: entityName, extension: '.spec.ts'},
    ]
  
    files.forEach(async (file) => {
      if (file.extension === '.ts') {
        await writeFile(
          entitiesPath + `/${entityName}/` + (file.name + file.extension), 
          EntitySliceContent,
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === 'Thunks.ts') {
        await writeFile(
          entitiesPath + `/${entityName}/` + (file.name + file.extension), 
          EntityThunksContent,
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === '.spec.ts') {
        await writeFile(
          entitiesPath + `/${entityName}/` + (file.name + file.extension), 
          EntityTestContent,
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else {
        await writeFile(entitiesPath + `${entityName}/` + (file.name + file.extension), '', {})
        console.log(cyan(file.name + file.extension) + ' file created!')
      }
    })
    addToReducerAndExports(entityReducerFile, entityExportsFile)
  } catch (error) {
    console.log(`Ooops... something went wrong: `, error)
    exit()
  }
}

createEntity()