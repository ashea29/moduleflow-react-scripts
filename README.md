# moduleflow-react-scripts

## Package still in development and testing - NOT YET READY FOR USE 

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app), along with three additional workflow scripts:<br>

- 'configureProject', which should be run first, will allow users to select CSS or styled-components for styling, to automate installing **styled-components** (if selected), along with **styled-breakpoints** and TypeScript type definitions, and to implement theme and utility boilerplate presets if desired.<br>
- 'createModule' will automate creating a new view or component along with it's CSS (or styled component -- if using styled components) and test file<br>
- 'createEntity' will automate creating a new entity/state slice in Redux (Redux-Toolkit implementation).<br>

This edition of react-scripts is intended to be paired with **cra-template-moduleflow**, which I am also currently developing.<br>

For more info about Create React App, please refer to its documentation:<br>

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.<br>

As for the new scripts I've added to this package, documentation will appear here when I'm finished developing them.

### Version Info

The current version of this package is 0.2.6 while still in development. Once ready for production the version will be updated to 1.0.0, but I intend to keep it in line with the most recent stable version of **react-scripts** (currently version 5.0.0).
