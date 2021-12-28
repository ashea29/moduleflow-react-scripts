import stripIndent from 'strip-indent';



export const ContainerUtility = stripIndent(`
  import styled from 'styled-components'

  const Container = styled.div\`
    width: 1000px;
    max-width: 100%;
    padding: 0.75rem 1.5rem
    margin: 0 auto;
  \`

  export default Container
`).trim()


export const FlexUtility = stripIndent(`
  import styled from 'styled-components'

  const Flex = styled.div\`

  \`

  export default Flex
`).trim()


export const LoadingSpinner = (answers) => {
if (answers["Styles Preference"][0] === "styled-components") {
  return stripIndent(`
    import React from 'react'
    import StyledLoadingSpinner from '../Styled/LoadingSpinner.styled'

    const LoadingSpinner: React.FC = () => {
      return (
        <StyledLoadingSpinner />
      )
    }

    export default LoadingSpinner
    `).trim()
  } else if (answers["Styles Preference"][0] === "CSS") {
    return stripIndent(`
      import React from 'react'
      import './LoadingSpinner.css'

      const LoadingSpinner: React.FC = () => {
        return (
          <div className='spinner'></div>
        )
      }

      export default LoadingSpinner
    `).trim()
  }
}

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

export const FullscreenSpinner = (answers) => {
  if (answers["Styles Preference"][0] === "styled-components") {
    return stripIndent(`
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
    } else if (answers["Styles Preference"][0] === "CSS") {
      return stripIndent(`
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
    }
  }

export const FullscreenSpinnerCSS = stripIndent(`
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


export const ThemePreset = stripIndent(`
  const theme = {
    colors: {},
    breakpoints: {
      phoneSmall: "300px",
      phoneMedium: "599px",
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


export const GlobalStylesPreset = stripIndent(`
  import { createGlobalStyle } from "styled-components"


  const GlobalStyles = createGlobalStyle\`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
  \`

  export default GlobalStyles
`).trim()


export const GlobalStylesCSSPreset = stripIndent(`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
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