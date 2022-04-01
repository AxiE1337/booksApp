import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userUid: null,
  userName: null,
  userEmail: null,
  userPhoto: null,
}

const userData = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    setUserData(state, { payload }) {
      state.value = payload
    },
  },
})
export const { setUserData } = userData.actions
export default userData.reducer
