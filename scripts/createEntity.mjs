import path from 'path';
import chalk from 'react-dev-utils/chalk.js';
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { stat } from 'fs'
import { argv, exit } from 'process'

import { appPath } from '../config/paths';
import {
  EntitySliceContent,
  EntityThunksContent,
  EntityTestContent
} from './addedScriptUtils/createEntity/templates.mjs'
import { entitiesPath } from './addedScriptUtils/scriptPaths.mjs'
import files from './addedScriptUtils/createEntity/filesIndex.mjs';


const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/State')
const { cyan, red, bgRed, green } = chalk


const entityExportsFile = `${basePath}/Entities/entityExports.ts`
const entityReducerFile = `${basePath}/entitiesReducer.ts`
const args = argv.slice(2)

let entityName = args[0]



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
          EntitySliceContent(entityName),
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === 'Thunks.ts') {
        await writeFile(
          entitiesPath + `/${entityName}/` + (file.name + file.extension), 
          EntityThunksContent(entityName),
          {}
        )
        console.log(cyan(file.name + file.extension) + ' file created!')
      } else if (file.extension === '.spec.ts') {
        await writeFile(
          entitiesPath + `/${entityName}/` + (file.name + file.extension), 
          EntityTestContent(entityName),
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