import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userProfile: {}
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserProfile: (state, action) => {
			state.userProfile = action.payload
		},
	}

})

// Action
export const {addUserProfile,} = userSlice.actions

// Reducer
export const getUserProfile = (state) => state.user.userProfile

// export default userSlice.reducer;