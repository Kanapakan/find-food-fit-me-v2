import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userProfile: {}
};

export const userDataSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserProfile: (state, action) => {
			state.userProfile = action.payload
		},
	}

})

export const {
	addUserProfile,
} = userDataSlice.actions

export const getUserProfile = (state) => state.user.userProfile

// export default userDataSlice.reducer;