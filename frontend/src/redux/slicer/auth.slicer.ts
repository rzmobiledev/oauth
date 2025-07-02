import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IAuth, IAuthState } from '../../schemas/reduxType'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        login: (state: IAuth, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const authState = (state: IAuthState) => state.auth
export const { login } = authSlice.actions
export default authSlice.reducer