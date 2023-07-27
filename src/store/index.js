import {configureStore} from '@reduxjs/toolkit';
import { userDataSlice } from './userSlice';

export const store = configureStore({
	reducer: {
		user: userDataSlice.reducer
	}
}) 