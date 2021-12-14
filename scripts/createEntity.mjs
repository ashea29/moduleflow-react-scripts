import path from 'path';
import { appPath } from 'moduleflow-react-scripts/config/paths';

const appRoot = path.resolve(appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

console.log('Hello from createEntity!')
console.log('Absolute path: ', appRoot)
console.log('basePath for Script: ', basePath)