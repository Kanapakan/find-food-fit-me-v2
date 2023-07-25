import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userDate: []
};

export const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			state.userDate.push(action.payload)
		},
	}

})

export const {
  addUserData,
} = userDataSlice.actions

export const getUserData = (state) => state.userData.userData

// export default userDataSlice.reducer;