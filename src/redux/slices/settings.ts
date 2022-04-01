import { createSlice } from '@reduxjs/toolkit'

let storageSettings: any = localStorage.getItem('settings')
let storageTheme: any = localStorage.getItem('theme')
storageSettings = JSON.parse(storageSettings)

const initialState = {
  menuPosition: storageSettings?.menuPosition || 'left',
  menuWidth: storageSettings?.menuWidth || 30,
}

const settings = createSlice({
  name: 'user',
  initialState: { value: initialState, theme: storageTheme || 'light' },
  reducers: {
    setSetting(state, { payload }) {
      state.value = payload
      localStorage.setItem('settings', JSON.stringify(payload))
    },
    theme(state) {
      if (state.theme === 'light') {
        state.theme = 'dark'
        localStorage.setItem('theme', 'dark')
      } else {
        state.theme = 'light'
        localStorage.setItem('theme', 'light')
      }
    },
  },
})
export const { setSetting, theme } = settings.actions
export default settings.reducer
