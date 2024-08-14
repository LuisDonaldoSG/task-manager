import { InitialState } from "@interfaces/layout";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
    openSideBarInMobile: false
}

const layoutSlice = createSlice({
    initialState,
    name: 'layout',
    reducers: {
        setOpenSideBarInMobile(state, action: PayloadAction<boolean>) {
            state.openSideBarInMobile = action.payload
        }
    }
})

export default layoutSlice.reducer
export const { setOpenSideBarInMobile } = layoutSlice.actions