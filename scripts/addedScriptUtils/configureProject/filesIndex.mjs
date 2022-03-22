import {
  srcPath,
  utilitiesComponentsPath,
  utilitiesGlobalPath,
  utilitiesStyledPath,
  themePath,
  authPath
} from '../scriptPaths.mjs'

import { 
  ContainerUtility, 
  FlexUtility,
  CenteredSectionUtility,
  GlobalUtilitiesCSS,
  GlobalUtilitiesSCSS,
  LoadingSpinner,
  LoadingSpinnerStyledComponent, 
  LoadingSpinnerCSS,
  LoadingSpinnerSCSS, 
  LoadingSpinnerStyled,
  FullscreenSpinner,
  FullscreenSpinnerStyledComponent,
  FullscreenSpinnerCSS,
  FullscreenSpinnerSCSS, 
  FullscreenSpinnerStyled, 
  ThemeStyledPreset,
  ThemeCSSPreset,
  ThemeSCSSPreset, 
  GlobalStylesPreset,
  GlobalStylesCSSPreset,
  GlobalStylesSCSSPreset,
  GlobalStylesThemePreset,
  GlobalStylesThemeCSSPreset, 
  GlobalStylesThemeSCSSPreset, 
  TSDeclarationsFile,
  ReduxAuthFile,
  ReduxAuthThunksFile
} from './configureProjectTemplates.mjs'



const files = [
  {
    name: 'Container', 
    extension: '.styled.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ], 
    path: utilitiesStyledPath,
    template: ContainerUtility
  },
  {
    name: 'Flex', 
    extension: '.styled.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ],
    path: utilitiesStyledPath,
    template: FlexUtility
  },
  {
    name: 'CenteredSection', 
    extension: '.styled.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ],
    path: utilitiesStyledPath,
    template: CenteredSectionUtility
  },
  {
    name: 'LoadingSpinner', 
    extension: '.tsx', 
    matchingConditions: [
      'css-utilities',
      'sass-utilities',
      'css-utilities-theme',
      'sass-utilities-theme',
      'css-utilities-auth',
      'sass-utilities-auth',
      'css-all',
      'sass-all'
    ],  
    path: utilitiesComponentsPath,
    template: LoadingSpinner
  },
  {
    name: 'LoadingSpinner', 
    extension: '.tsx', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ],  
    path: utilitiesComponentsPath,
    template: LoadingSpinnerStyledComponent
  },
  {
    name: 'FullscreenSpinner', 
    extension: '.tsx', 
    matchingConditions: [
      'css-utilities',
      'sass-utilities',
      'css-utilities-theme',
      'sass-utilities-theme',
      'css-utilities-auth',
      'sass-utilities-auth',
      'css-all',
      'sass-all'
    ],
    path: utilitiesComponentsPath,
    template: FullscreenSpinner
  },
  {
    name: 'FullscreenSpinner', 
    extension: '.tsx', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ],
    path: utilitiesComponentsPath,
    template: FullscreenSpinnerStyledComponent
  },
  {
    name: 'LoadingSpinner', 
    extension: '.styled.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ],
    path: utilitiesStyledPath,
    template: LoadingSpinnerStyled
  },
  {
    name: 'FullscreenSpinner', 
    extension: '.styled.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-theme',
      'styled-utilities-auth',
      'styled-all'
    ], 
    path: utilitiesStyledPath,
    template: FullscreenSpinnerStyled
  },
  {
    name: 'styled', 
    extension: '.d.ts', 
    matchingConditions: [
      'styled-utilities-theme',
      'styled-theme-auth',
      'styled-theme',
      'styled-all'
    ], 
    path: srcPath,
    template: TSDeclarationsFile
  },
  {
    name: 'GlobalUtilities', 
    extension: '.css', 
    matchingConditions: [
      'css-utilities',
      'css-utilities-theme',
      'css-utilities-auth',
      'css-all',
    ],
    path: utilitiesGlobalPath,
    template: GlobalUtilitiesCSS
  },
  {
    name: 'LoadingSpinner', 
    extension: '.css', 
    matchingConditions: [
      'css-utilities',
      'css-utilities-theme',
      'css-utilities-auth',
      'css-all',
    ],
    path: utilitiesComponentsPath,
    template: LoadingSpinnerCSS
  },
  {
    name: 'FullscreenSpinner', 
    extension: '.css', 
    matchingConditions: [
      'css-utilities',
      'css-utilities-theme',
      'css-utilities-auth',
      'css-all',
    ],
    path: utilitiesComponentsPath,
    template: FullscreenSpinnerCSS
  },
  {
    name: 'GlobalUtilities', 
    extension: '.scss', 
    matchingConditions: [
      'sass-utilities',
      'sass-utilities-theme',
      'sass-utilities-auth',
      'sass-all',
    ], 
    path: utilitiesGlobalPath,
    template: GlobalUtilitiesSCSS
  },
  {
    name: 'LoadingSpinner', 
    extension: '.scss', 
    matchingConditions: [
      'sass-utilities',
      'sass-utilities-theme',
      'sass-utilities-auth',
      'sass-all',
    ], 
    path: utilitiesComponentsPath,
    template: LoadingSpinnerSCSS
  },
  {
    name: 'FullscreenSpinner', 
    extension: '.scss', 
    matchingConditions: [
      'sass-utilities',
      'sass-utilities-theme',
      'sass-utilities-auth',
      'sass-all',
    ], 
    path: utilitiesComponentsPath,
    template: FullscreenSpinnerSCSS
  },
  {
    name: 'Theme', 
    extension: '.ts', 
    matchingConditions: [
      'styled-utilities-theme',
      'styled-theme-auth',
      'styled-theme',
      'styled-all',
    ], 
    path: themePath,
    template: ThemeStyledPreset
  },
  {
    name: 'Global', 
    extension: '.ts', 
    matchingConditions: [
      'styled-utilities',
      'styled-utilities-auth',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesPreset
  },
  {
    name: 'Global', 
    extension: '.ts', 
    matchingConditions: [
      'styled-utilities-theme',
      'styled-all',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesThemePreset
  },
  {
    name: 'Global', 
    extension: '.css', 
    matchingConditions: [
      'css-utilities',
      'css-utilities-auth',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesCSSPreset
  },
  {
    name: 'Global', 
    extension: '.css', 
    matchingConditions: [
      'css-utilities-theme',
      'css-all',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesThemeCSSPreset
  },
  {
    name: 'Global', 
    extension: '.scss', 
    matchingConditions: [
      'sass-utilities',
      'sass-utilities-auth',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesSCSSPreset
  },
  {
    name: 'Global', 
    extension: '.scss', 
    matchingConditions: [
      'sass-utilities-theme',
      'sass-all',
    ],
    path: utilitiesGlobalPath,
    template: GlobalStylesThemeSCSSPreset
  },
  {
    name: 'theme', 
    extension: '.css', 
    matchingConditions: [
      'css-theme',
      'css-utilities-theme',
      'css-theme-auth',
      'css-all',
    ],
    path: themePath,
    template: ThemeCSSPreset
  },
  {
    name: 'theme', 
    extension: '.scss', 
    matchingConditions: [
      'sass-theme',
      'sass-utilities-theme',
      'sass-theme-auth',
      'sass-all',
    ],
    path: themePath,
    template: ThemeSCSSPreset
  },
  {
    name: 'auth', 
    extension: '.ts', 
    matchingConditions: [
      'styled-utilities-auth',
      'styled-theme-auth',
      'styled-auth',
      'css-utilities-auth',
      'css-theme-auth',
      'css-auth',
      'sass-utilities-auth',
      'sass-theme-auth',
      'sass-auth',
      'styled-all',
      'css-all',
      'sass-all'
    ],
    path: authPath,
    template: ReduxAuthFile
  },
  {
    name: 'authThunks', 
    extension: '.ts', 
    matchingConditions: [
      'styled-utilities-auth',
      'styled-theme-auth',
      'styled-auth',
      'css-utilities-auth',
      'css-theme-auth',
      'css-auth',
      'sass-utilities-auth',
      'sass-theme-auth',
      'sass-auth',
      'styled-all',
      'css-all',
      'sass-all'
    ],
    path: authPath,
    template: ReduxAuthThunksFile
  }
]


export default files