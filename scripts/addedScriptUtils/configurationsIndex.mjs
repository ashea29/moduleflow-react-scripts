const configurations = [
  {
    name: 'styled-utilities',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "styled-components",
      "theme": false,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'css-utilities',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "CSS",
      "theme": false,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'sass-utilities',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": false,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'styled-theme',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Theme/Global Presets Preference"] === true || options.theme)',
    config: {
      "styles": "styled-components",
      "theme": true,
      "utilities": false,
      "auth": false
    }
  },
  {
    name: 'css-theme',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Theme/Global Presets Preference"] === true || options.theme)',
    config: {
      "styles": "CSS",
      "theme": true,
      "utilities": false,
      "auth": false
    }
  },
  {
    name: 'sass-theme',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Theme/Global Presets Preference"] === true || options.theme)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": true,
      "utilities": false,
      "auth": false
    }
  },
  {
    name: 'styled-auth',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "styled-components",
      "theme": false,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'css-auth',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "CSS",
      "theme": false,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'sass-auth',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": false,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'styled-theme-auth',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "styled-components",
      "theme": true,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'css-theme-auth',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "CSS",
      "theme": true,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'sass-theme-auth',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": true,
      "utilities": false,
      "auth": true
    }
  },
  {
    name: 'styled-utilities-theme',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "styled-components",
      "theme": true,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'css-utilities-theme',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "CSS",
      "theme": true,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'sass-utilities-theme',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": true,
      "utilities": true,
      "auth": false
    }
  },
  {
    name: 'styled-utilities-auth',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Redux Auth Preference"] === true || options.auth) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "styled-components",
      "theme": false,
      "utilities": true,
      "auth": true
    }
  },
  {
    name: 'css-utilities-auth',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Redux Auth Preference"] === true || options.auth) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "CSS",
      "theme": false,
      "utilities": true,
      "auth": true
    }
  },
  {
    name: 'sass-utilities-auth',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Redux Auth Preference"] === true || options.auth) && (answers["Utilities Preference"][0] === true || options.utilities)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": false,
      "utilities": true,
      "auth": true
    }
  },
  {
    name: 'styled-all',
    check: '(answers["Styles Preference"][0] === "styled-components" || options.styled) && (answers["Utilities Preference"][0] === true || options.utilities) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "styled-components",
      "theme": true,
      "utilities": true,
      "auth": true
    }
  },
  {
    name: 'css-all',
    check: '(answers["Styles Preference"][0] === "CSS" || options.css) && (answers["Utilities Preference"][0] === true || options.utilities) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "CSS",
      "theme": true,
      "utilities": true,
      "auth": true
    }
  },
  {
    name: 'sass-all',
    check: '(answers["Styles Preference"][0] === "Sass (SCSS)" || options.scss) && (answers["Utilities Preference"][0] === true || options.utilities) && (answers["Theme/Global Presets Preference"] === true || options.theme) && (answers["Redux Auth Preference"] === true || options.auth)',
    config: {
      "styles": "Sass (SCSS)",
      "theme": true,
      "utilities": true,
      "auth": true
    }
  }
]


export default configurations