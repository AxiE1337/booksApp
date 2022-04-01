import { configureStore } from '@reduxjs/toolkit'
import useDataReducer from './slices/userData'
import settingsReducer from './slices/settings'

export default configureStore({
  reducer: {
    userData: useDataReducer,
    settings: settingsReducer,
  },
})
