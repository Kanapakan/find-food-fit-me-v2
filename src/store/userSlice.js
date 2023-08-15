import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userProfile: {},
	bookmark: [],
	userRecipe: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserProfile: (state, action) => {
			state.userProfile = action.payload
		},
		addUserRecipe: (state, action) => {
			state.userRecipe = action.payload
		},
	}

})

// Action
export const {addUserProfile, addUserRecipe} = userSlice.actions

// Reducer
export const getUserProfile = (state) => state.user.userProfile
export const getUserRecipe = (state) => state.user.userRecipe

// export default userSlice.reducer;