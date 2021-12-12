const path = require('path');
const paths = require('../config/paths');

const appRoot = paths.appPath
const basePath = appRoot + 'src/Modules/'

console.log('Hello from createEntity!')
console.log('Absolute path: ', path.resolve(paths.appPath))
console.log('basePath for Script: ', basePath)