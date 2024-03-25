import { config } from "@/utils/config";
import { IUser } from "@/utils/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IntialAppState{
    allUserInfo:IUser[]
    userInfo: IUser | null,
}

const initialState: IntialAppState = {
    allUserInfo:[],
    userInfo:null,
}

export const fetchAllUsers = createAsyncThunk(
    "app/fetchAllUsers",
    async (optioins:any,thankApi) => {
        try {
            const res = await fetch(`${config.apiBaseUrl}/api/user`, {
                method:"GET"
            })
            const  {allUserInfo}  = await res.json();
            thankApi.dispatch(setUsers(allUserInfo))
        } catch (error) {
            console.log(error)
        }
    }
)
const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.userInfo = action.payload;
        },
        setUsers: (state, action) => {
            state.allUserInfo = action.payload;
        }
    }
})

export const { addUsers,setUsers } = appSlice.actions;
export default appSlice.reducer;