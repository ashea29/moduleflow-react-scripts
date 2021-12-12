const path = require('path');
const paths = require('../config/paths');

const appRoot = path.resolve(paths.appPath)
const basePath = path.resolve(appRoot, 'src/Modules')

console.log('Hello from createEntity!')
console.log('Absolute path: ', appRoot)
console.log('basePath for Script: ', basePath)