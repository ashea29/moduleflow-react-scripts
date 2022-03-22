import stripIndent from 'strip-indent';



export const ContainerUtility = stripIndent(`
  import styled from 'styled-components'

  const Container = styled.div\`
    width: 80%;
    max-width: 1000px;
    padding: 0.75rem 1.5rem;
    margin: 0 auto;
  \`

  export default Container
`).trim()


export const FlexUtility = stripIndent(`
  import styled from 'styled-components'

  const Flex = styled.div\`
    display: flex;
    flex-direction: \${(props) => props.direction || "row"};
    align-items: \${(props) => props.align || "center"};
    justify-content: \${(props) => props.justify || "center"};
    width: \${(props) => props.width || "100%"};
    min-height: \${(props) => props.minHeight || "100%"};
  \`

  export default Flex
`).trim()


export const CenteredSectionUtility = stripIndent(`
  import styled from 'styled-components'

  const CenteredSection = styled.section\`
    display: grid;
    width: 100%;
    min-height: 100vh;
    place-content: center;
  \`

  export default CenteredSection
`).trim()


export const GlobalUtilitiesCSS = stripIndent(`
  .container {
    width: 80%;
    max-width: 1000px;
    padding: 0.75rem 1.5rem;
    margin: 0 auto;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .centered-section {
    display: grid;
    width: 100%;
    min-height: 100vh;
    place-content: center;
  }
`).trim()


export const GlobalUtilitiesSCSS = stripIndent(`
  .container {
    width: 80%;
    max-width: 1000px;
    padding: 0.75rem 1.5rem;
    margin: 0 auto;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .centered-section {
    display: grid;
    width: 100%;
    min-height: 100vh;
    place-content: center;
  }
`).trim()


export const LoadingSpinner = stripIndent(`
  import React from 'react'
  import './LoadingSpinner.css'

  const LoadingSpinner: React.FC = () => {
    return (
      <div className='spinner'></div>
    )
  }

  export default LoadingSpinner
`).trim()


export const LoadingSpinnerStyledComponent = stripIndent(`
  import React from 'react'
  import StyledLoadingSpinner from '../Styled/LoadingSpinner.styled'

  const LoadingSpinner: React.FC = () => {
    return (
      <StyledLoadingSpinner />
    )
  }

  export default LoadingSpinner
`).trim()


export const LoadingSpinnerCSS = stripIndent(`
  .spinner {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .spinner:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #713956;
    border-color: #713956 transparent #713956 transparent;
    animation: spinner 1.2s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`).trim()


export const LoadingSpinnerSCSS = stripIndent(`
  .spinner {
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
      content: ' ';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #713956;
      border-color: #713956 transparent #713956 transparent;
      animation: spinner 1.2s linear infinite;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`).trim()


export const LoadingSpinnerStyled = stripIndent(`
  import styled from 'styled-components'


  const StyledLoadingSpinner = styled.div\`
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
      content: ' ';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #713956;
      border-color: #713956 transparent #713956 transparent;
      animation: spinner 1.2s linear infinite;
    }

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  \`

  export default StyledLoadingSpinner
`).trim()

export const FullscreenSpinner = stripIndent(`
  import React from 'react'
  import LoadingSpinner from './LoadingSpinner'
  import './FullScreenSpinner.css'
  
  
  const FullScreenSpinner: React.FC = () => {
    return (
      <div className='spinner-container'>
        <LoadingSpinner />
      </div>
    )
  }
  
  export default FullScreenSpinner
`).trim()


export const FullscreenSpinnerStyledComponent = stripIndent(`
  import React from 'react'
  import LoadingSpinner from './LoadingSpinner'
  import StyledFullscreenSpinner from '../Styled/FullscreenSpinner.styled'


  const FullScreenSpinner: React.FC = () => {
    return (
      <StyledFullscreenSpinner>
        <LoadingSpinner />
      </StyledFullscreenSpinner>
    )
  }

  export default FullScreenSpinner
`).trim()


export const FullscreenSpinnerCSS = stripIndent(`
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 45% 0;
    width: 100%;
  }
`).trim()


export const FullscreenSpinnerSCSS = stripIndent(`
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 45% 0;
    width: 100%;
  }
`).trim()


export const FullscreenSpinnerStyled = stripIndent(`
  import styled from 'styled-components'


  const StyledFullscreenSpinner = styled.div\`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 45% 0;
    width: 100%;
  \`

  export default StyledFullscreenSpinner
`).trim()


export const ThemeStyledPreset = stripIndent(`
  const theme = {
    colors: {
      primary: '',
      secondary: '',
      tertiary: '',
      success: '',
      warning: '',
      danger: ''
    },
    fonts: {
      primaryFont: '',
      secondaryFont: '',
      tertiaryFont: ''
    },
    breakpoints: {
      tabletPortrait: "600px",
      tabletLandscape: "900px",
      pcSmall: "1200px",
      pcMedium: "1500px",
      pcLarge: "1800px",
      pcXLarge: "2100px"
    }
  }


  export default theme
`).trim()


export const ThemeCSSPreset = stripIndent(`
  @import url('https://fonts.googleapis.com/css2?family=Jaldi:wght@400;700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


  :root {
    /* 
      Colors - BE SURE TO SET VALUES FOR THE VARIABLES (replacing empty strings
      with color name, rgb/rgba, or hex)! 
    */
    --primary-color: '';
    --secondary-color: '';
    --tertiary-color: '';
    --success-color: '';
    --warning-color: '';
    --danger-color: '';

    // Fonts
    --main-font: 'Poppins', sans-serif;
    --tertiary-font: 'Jaldi', sans-serif;
    --secondary-font: 'Montserrat', sans-serif;

    --heading-font: var(--tertiary-font);
    --subheading-font: var(--secondary-font);


    /* Breakpoints (designed for min-width) */
    --tabletPortrait: 600px;
    --tabletLandscape: 900px;
    --pcSmall: 1200px;
    --pcMedium: 1500px;
    --pcLarge: 1800px;
    --pcXLarge: 2100px;
  }
`).trim()


export const ThemeSCSSPreset = stripIndent(`
  @import url('https://fonts.googleapis.com/css2?family=Jaldi:wght@400;700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');



  // Fonts
  $main-font: 'Poppins', sans-serif;
  $tertiary-font: 'Jaldi', sans-serif;
  $secondary-font: 'Montserrat', sans-serif;

  $heading-font: $tertiary-font;
  $subheading-font: $secondary-font;


  /* 
    Colors - BE SURE TO SET VALUES FOR THE VARIABLES (replacing empty strings
    with color name, rgb/rgba, or hex)! 
  */
  $primary-color: '';
  $secondary-color: '';
  $tertiary-color: '';
  $success-color: '';
  $warning-color: '';
  $danger-color: '';


  /* Breakpoints (designed for min-width) */
  $tabletPortrait: 600px;
  $tabletLandscape: 900px;
  $pcSmall: 1200px;
  $pcMedium: 1500px;
  $pcLarge: 1800px;
  $pcXLarge: 2100px;
`).trim()


export const GlobalStylesPreset = stripIndent(`
  import { createGlobalStyle } from "styled-components"


  const GlobalStyles = createGlobalStyle\`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', sans-serif;
    }
  \`

  export default GlobalStyles
`).trim()


export const GlobalStylesThemePreset = stripIndent(`
  import { createGlobalStyle } from "styled-components"


  const GlobalStyles = createGlobalStyle\`
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', sans-serif;
    }
  \`

  export default GlobalStyles
`).trim()


export const GlobalStylesCSSPreset = stripIndent(`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`).trim()


export const GlobalStylesThemeCSSPreset = stripIndent(`
  @import '../../theme/theme.css'

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--primary-font);
  }
`).trim()


export const GlobalStylesSCSSPreset = stripIndent(`
  /* Global styles (variables, mixins, functions) */

  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


  // Padding & margin reset, box-sizing 
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }


  // Set text color based on background
  @function set-text-color($color) {
    @if (lightness($color) > 70) {
      @return #333;
    } @else {
      @return #fff;
    }
  }

  // Set background and text color
  @mixin set-background-color($color) {
    background-color: $color;
    color: set-text-color($color)
  }
`).trim()


export const GlobalStylesThemeSCSSPreset = stripIndent(`
  @use '../../theme/theme.scss' as *;

  /* Global styles (variables, mixins, functions) */

  // Padding & margin reset, box-sizing 
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: $primary-font;
  }


  // Set text color based on background
  @function set-text-color($color) {
    @if (lightness($color) > 70) {
      @return #333;
    } @else {
      @return #fff;
    }
  }

  // Set background and text color
  @mixin set-background-color($color) {
    background-color: $color;
    color: set-text-color($color)
  }
`).trim()


export const TSDeclarationsFile = stripIndent(`
  import { DefaultTheme } from 'styled-components';
  
  declare module 'styled-components' {
    export interface DefaultTheme {
      breakpoints: {
        [name in 
          'phoneSmall'      | 
          'phoneMedium'     | 
          'tabletPortrait'  | 
          'tabletLandscape' | 
          'pcSmall'         | 
          'pcMedium'        | 
          'pcLarge'         | 
          'pcXLarge'
        ]: string;
      };
    }
  }
`).trim()


export const ReduxAuthFile = stripIndent(`
  import { createSlice } from '@reduxjs/toolkit'
  import { RootState } from '../store'
  import { createSelector } from 'reselect'

  import { login, signup, logout } from './authThunks'



  export interface AuthState {
    isLoading: Boolean
    isAuthenticated: Boolean
    isAdmin: boolean
    firstLogin: Boolean
    firstName?: String | null
    username?: String | null
    email?: String | null
    error?: any
  }


  const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    firstLogin: true, 
    firstName: null, 
    username: null, 
    email: null,
    error: null
  }


  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      SET_AUTH_USERDATA: (state, { payload }) => {
        state.firstName = payload.firstName
        state.username = payload.username
        state.email = payload.email
        state.isAdmin = payload.isAdmin
      },
      SET_FIRSTLOGIN: (state, { payload }) => {
        state.firstLogin = payload
      },
      SET_AUTHENTICATED: (state, { payload }) => {
        state.isAuthenticated = payload
      },
      SET_AUTH_ERROR: (state, { payload }) => {
        state.error = payload
      },
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
      })
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false
      })
      builder.addCase(signup.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
        state.firstLogin = false
        state.isAuthenticated = true
      })
      builder.addCase(signup.rejected, (state, action) => {
        state.isLoading = false
      })
      builder.addCase(logout.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
      })
      builder.addCase(logout.rejected, (state, action) => {
        state.isLoading = false
      })
    }
  })

  export const { SET_AUTH_USERDATA, SET_AUTHENTICATED, SET_AUTH_ERROR, SET_FIRSTLOGIN } = authSlice.actions


  export const selectAuthUserData = createSelector(
    (state: RootState) => state.auth, 
    (userdata) => userdata
  )

  export const selectIsLoading = createSelector(
    (state: RootState) => state.auth.isLoading,
    (isLoading) => isLoading
  )

  export const selectIsAuthenticated = createSelector(
    (state: RootState) => state.auth.isAuthenticated,
    (isAuthenticated) => isAuthenticated
  )

  export const selectAuthError = createSelector(
    (state: RootState) => state.auth.error,
    (error) => error
  )


  export default authSlice.reducer
`).trim()


export const ReduxAuthThunksFile = stripIndent(`
  import { createAsyncThunk } from '@reduxjs/toolkit'
  import { AppDispatch } from '../store'
  import { SET_AUTH_ERROR, SET_AUTHENTICATED, SET_AUTH_USERDATA } from './auth'
  import axios from 'axios'



  interface LoginCredentials {
    email: string
    password: string
  }

  interface SignupData {
    firstName: string
    username: string
    email: string
    password: string
    confirmPassword: string
  }

  interface ThunkAPI {
    dispatch: AppDispatch
    getState: Function
    extra?: any
    requestId: string
    signal: AbortSignal
  }


  export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, thunkAPI: ThunkAPI) => {
      const dispatch = thunkAPI.dispatch

      const loginUrl = "LOGIN_URL"
      try {
        await axios.request<any>({
          method: 'POST',
          url: loginUrl,
          data: {
            email: credentials.email,
            password: credentials.password
          }
        })
        dispatch(SET_AUTHENTICATED(true))
      } catch (error: any) {
        dispatch(SET_AUTH_ERROR(error))
      }
    }
  )

  export const signup = createAsyncThunk(
    'auth/signup',
    async (signupData: SignupData, thunkAPI: ThunkAPI) => {
      const dispatch = thunkAPI.dispatch

      const signupUrl = "SIGNUP_URL"
      try {
        await axios.request<any>({
          method: 'POST',
          url: signupUrl,
          data: {
            firstName: signupData.firstName,
            username: signupData.username,
            email: signupData.email,
            password: signupData.password,
            confirmPassword: signupData.confirmPassword
          }
        })
        dispatch(SET_AUTHENTICATED(true))
      } catch (error: any) {
        dispatch(SET_AUTH_ERROR(error))
      }
    }
  )

  export const logout = createAsyncThunk(
    'auth/logout',
    async (param: null, thunkAPI: ThunkAPI) => {
      const dispatch = thunkAPI.dispatch

      try {
        dispatch(SET_AUTH_USERDATA({
          firstName: null, 
          username: null, 
          email: null
        }))
        dispatch(SET_AUTHENTICATED(false))
        dispatch(SET_AUTH_ERROR(null))
        
      } catch (error: any) {
        dispatch(SET_AUTH_ERROR(error))
      }
    }
  )
`).trim()


export const indexTSXImports = stripIndent(`
  import { ThemeProvider } from 'styled-components'
  import theme from './theme/Styled/Theme'
  import GlobalStyles from './theme/Styled/Global'
`).trim()