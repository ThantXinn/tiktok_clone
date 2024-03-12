import { IUser } from "@/utils/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IntialAppState{
    userInfo: IUser[]
}

const initialState: IntialAppState = {
    userInfo:[]
}

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const { addUsers } = appSlice.actions;
export default appSlice.reducer;