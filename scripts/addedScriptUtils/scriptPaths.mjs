import path from 'path';
import paths from '../../config/paths';

const { appPath } = paths

export const appRoot = path.resolve(appPath)
export const srcPath = path.resolve(appRoot, 'src')
export const modulesPath = path.resolve(srcPath, 'Modules')
export const statePath = path.resolve(srcPath, 'State')
export const entitiesPath = path.resolve(statePath, 'Entities')
export const utilitiesGlobalPath = path.resolve(srcPath, 'utilities/')
export const utilitiesComponentsPath = path.resolve(utilitiesGlobalPath, 'components')
export const utilitiesStyledPath = path.resolve(utilitiesGlobalPath, 'Styled')
export const themePath = path.resolve(srcPath, 'theme')
export const authPath = path.resolve(statePath, 'auth')