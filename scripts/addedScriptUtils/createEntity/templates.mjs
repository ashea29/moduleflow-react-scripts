import stripIndent from 'strip-indent';


export const EntitySliceContent = (entityName) => stripIndent(`
  import { createSlice } from '@reduxjs/toolkit'
  import { RootState } from '../../State/store'
  import { createSelector } from 'reselect'
  import { ${entityName}Thunk } from './${entityName}Thunks'


  interface Initial${entityName}State {
    isLoading: Boolean
    ${entityName}Data: {} | null
  }

  const initialState: Initial${entityName}State = {
    isLoading: false,
    ${entityName}Data: null
  }

  const ${entityName}Slice = createSlice({
    name: '${entityName}',
    initialState,
    reducers: {
      SET_DATA: (state, { payload }) => {
        state.${entityName}Data = payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(${entityName}Thunk.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(${entityName}Thunk.fulfilled, (state, action) => {
        state.isLoading = false
      })
      builder.addCase(${entityName}Thunk.rejected, (state, action) => {
        state.isLoading = false
      })
    }
  })

  export const { SET_DATA } = ${entityName}Slice.actions

  export const select${entityName[0].toUpperCase + entityName.slice(1)} = createSelector(
    (state: RootState) => state.modules.${entityName}, 
    (${entityName}Data) => ${entityName}Data
  )
  
  export default ${entityName}Slice.reducer
`).trim()



export const EntityThunksContent = (entityName) => stripIndent(`
  import { createAsyncThunk } from '@reduxjs/toolkit'
  import { AppDispatch } from '../../State/store'


  interface ${entityName}ThunkProps {
    fieldOne: string
  }

  interface ThunkAPI {
    dispatch: AppDispatch
    getState: Function
    extra?: any
    requestId: string
    signal: AbortSignal
  }

  export const ${entityName}Thunk = createAsyncThunk<void, ${entityName}ThunkProps, ThunkAPI>(
    '${entityName}/sample',
    async (thunkProps, thunkAPI) => {
      const dispatch = thunkAPI.dispatch
      try {
        setTimeout(() => {
          console.log('Sample output from thunk')
        }, 3000)
      } catch (error) {
        throw error
      }
    }
  )
`).trim()



export const EntityTestContent = (entityName) => stripIndent(`
  describe('${entityName} state', () => {

  });
`).trim()