import stripIndent from 'strip-indent' 


export const ViewContent = (moduleName, moduleRoutePath, options) => stripIndent(`
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


export const ComponentContent = (moduleName, options) => stripIndent(`
  import React from 'react'
  ${options.styled ? 
    `import Styled${moduleName} from '../../Styled/${moduleName}.styled'`
    : `import styles from './${moduleName}.module.css'`
  }
  
  const ${moduleName}: React.FC = (props: any) => {
    return (
      ${options.styled ?
      `<Styled${moduleName}>
          ${moduleName}
      </Styled${moduleName}>`
        : 
      `<div>
        ${moduleName}
      </div>` 
      }
    )
  }
  export default ${moduleName}
`).trim()


export const StyledComponentContent = (moduleName) => stripIndent(`
  import styled from 'styled-components'

  const Styled${moduleName} = styled.div\`

  \`

  export default Styled${moduleName}
`).trim()


export const ViewLoadable = (moduleName) => stripIndent(`
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


export const ComponentLoadable = (moduleName) => stripIndent(`
  import loadable from '@loadable/component'
  import pTimeout from 'p-timeout';


  const ${moduleName}Loadable = loadable(() =>
    pTimeout(import('./${moduleName}'), 10000, 'Element failed to load')
  )

  export default ${moduleName}Loadable
`).trim()


export const TestFileContent = (moduleName) => stripIndent(`
  describe('${moduleName}', () => {

  });
`).trim()